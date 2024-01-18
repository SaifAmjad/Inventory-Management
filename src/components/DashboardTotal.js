import React, { useEffect, useState } from 'react'
import InventoryIcon from '@mui/icons-material/Inventory';
import CompletedGraph from "./CompletedGraph";
import CompletedSales from './CompletedSales';

const DashboardTotal = () => {

  const [total,setTotal]=useState([]);
  const [com,setCom]=useState([]);
  const [pending,setPending]=useState([]);
  const [cost,setCost]=useState();
  const [products,setProducts]=useState([]);

  const getData=async()=>{
    try {
        const res=await fetch('http://localhost:5000/products');
        const d=await res.json();
        setTotal(d);
       } catch (error) {
        console.log(error)
       }
}

const completed=async()=>{
  try {
    const res=await fetch('http://localhost:5000/orders/completed');
    const data=await res.json();
    setCom(data);
  } catch (error) {
    console.log(error);
  }
}

const orderData=async()=>{
  try {
    const res=await fetch('http://localhost:5000/orders');
    const data=await res.json();
    setPending(data);
  } catch (error) {
    console.log(error);
  }
}


const fetchData=async()=>{
  try {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  } catch (error) {
    console.log(error);
  }
}

const totalEarning=async()=>{
  
    let total=0;
    products.some((obj)=>{
      
      total=total+obj.Cost;
    })
    const formattedNumber = total.toLocaleString("en-US");
     setCost(formattedNumber);
}



useEffect(()=>{
  getData();
  completed();
  orderData();
  fetchData();
  totalEarning();
},[total,com,pending,products])


  return (
    <div className="dashboard-custom">
    <h7>
      <i className="fa-solid fa-gauge"></i> Dashboard
    </h7>
    <div className="card w-75" style={{position:"absolute",top:"60px",left:"15pc",height:"9pc",borderRadius:'20px'}}>
      <div className="card-body">
          <div style={{position:"absolute",top:"48px",left:"50px",width:"200px"}}>
              <h6 style={{position:"relative",left:"65px",top:'-4px'}}>Total Products <h2>{total.length}</h2></h6>
              <div style={{backgroundColor:"rgb(231, 231, 231)",width:"42px",height:'42px',borderRadius:'20px',display:'flex',justifyContent:"center",alignItems:'center',position:'relative',top:'-70px'}}><InventoryIcon/></div>
          </div>

          <div style={{position:"absolute",top:"48px",left:"310px",width:"200px"}}>
              <h6 style={{position:"relative",left:"65px",top:'-4px'}}>Pending Orders <h2>{pending.length}</h2></h6>
              <div style={{backgroundColor:"rgb(231, 231, 231)",width:"42px",height:'42px',borderRadius:'20px',display:'flex',justifyContent:"center",alignItems:'center',position:'relative',top:'-70px'}}><i class="fa-solid fa-clock-rotate-left"></i></div>
          </div>

          <div style={{position:"absolute",top:"48px",left:"580px",width:"220px"}}>
              <h6 style={{position:"relative",left:"65px",top:'-4px'}}>Completed Orders <h2>{com.length}</h2></h6>
              <div style={{backgroundColor:"rgb(231, 231, 231)",width:"42px",height:'42px',borderRadius:'20px',display:'flex',justifyContent:"center",alignItems:'center',position:'relative',top:'-70px'}}><i class="fa-solid fa-square-check"></i></div>
          </div>

          <div style={{position:"absolute",top:"48px",left:"860px",width:"220px"}}>
              <h6 style={{position:"relative",left:"65px",top:'-4px'}}>Total Cost Rs <h2>{cost}</h2></h6>
              <div style={{backgroundColor:"rgb(231, 231, 231)",width:"42px",height:'42px',borderRadius:'20px',display:'flex',justifyContent:"center",alignItems:'center',position:'relative',top:'-70px'}}><i class="fa-solid fa-money-bill"></i></div>
          </div>
      
      </div>
    </div>
    <CompletedGraph/>
    <CompletedSales/>

 
  </div>
  )
}

export default DashboardTotal
