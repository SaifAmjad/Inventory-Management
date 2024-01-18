import React, { useEffect, useState } from 'react';

import { AgChartsReact } from 'ag-charts-react';

const SalesGraph = () => {

    const[com,setCom]=useState([]);

    const completedOrders=async()=>{
        try {
          const res=await fetch('http://localhost:5000/orders/completed');
          const data=await res.json();
          setCom(data);
          
        } catch (error) {
          console.log(error);
        }
      }

      const genCompleted=()=>{
        const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        let data=[]
        com.forEach((ele)=>{
            const index=data.length;
            const monthSplit=ele.Date.split('-')[1];

            if(data.some( (obj)=>{ return obj.month===months[monthSplit-1]})){

                let ind;
                data.some((obj,i)=>{
                    if(obj.month===months[monthSplit-1]){
                        ind=i;
                    }
                })
               
                    data[ind].subscriptions++;    
            }
            else{
                data[index]={month:months[monthSplit-1],subscriptions:1};

            }
            
        })
        return data;
      }

      useEffect(()=>{
        completedOrders();
        setOptions({
            title: {
                text: 'Sales per Month',
            },
            data: genCompleted()
        ,
            series: [
                {
                    type: 'area',
                    xKey: 'month',
                    yKey: 'subscriptions',
                    yName: 'Subscriptions',
                }
            ],
        })
      },[com])

    const [options, setOptions] = useState({
        title: {
            text: 'Sales per Month',
        },
        data: genCompleted()
    ,
        series: [
            {
                type: 'area',
                xKey: 'month',
                yKey: 'subscriptions',
                yName: 'Subscriptions',
            }
        ],
    });

    

    return <AgChartsReact options={options} />;
};

export default SalesGraph;