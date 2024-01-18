import { AgChartsReact } from 'ag-charts-react';
import { useEffect, useState } from 'react';

const GraphSold = () => {
    const[data,setData]=useState([])

    const getData=async()=>{
        try {
            const res=await fetch('http://localhost:5000/products');
            const d=await res.json();
            setData(d);
           } catch (error) {
            console.log(error)
           }
    }
    
   
    
    const genChart=()=>{
        const chart=data.map((ele)=>{
            return ele.Catagory;
        })
        
        let results=[];
        
        chart.forEach((ele)=>{

            
            if(results.some((obj)=>obj.asset===ele)){

                let index;
                results.some((obj,i)=>{
                    if(obj.asset===ele){
                        index=i;
                    }
                })
                    results[index].amount++;        
            }
            else{
                const newIndex=results.length;
                results[newIndex]={asset:ele,amount:1}
                
            }
        })
          
          return results;
    }

    useEffect(()=>{
        getData();
        setOptions({
            data: genChart(),
        title: {
            text: 'Most Sold Catagory',
        },
        series: [
            {
                type: 'pie',
                angleKey: 'amount',
                calloutLabelKey: 'asset',
            },
            
        ],
        })
    },[data])

    const [options, setOptions] = useState({
        data: genChart(),
        title: {
            text: 'Most Sold Catagory',
        },
        series: [
            {
                type: 'pie',
                angleKey: 'amount',
                calloutLabelKey: 'asset',
            },
        ],
    });

    

    return <AgChartsReact options={options} />;
};

export default GraphSold;