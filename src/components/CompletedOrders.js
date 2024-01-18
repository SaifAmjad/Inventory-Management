import React, { useEffect, useState } from 'react'

const CompletedOrders = () => {

  const[comlist,setComlist]=useState([]);

  const addComlist=async()=>{
    try {
      const res=await fetch('http://localhost:5000/orders/completed');
      const data=await res.json();
      setComlist(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    addComlist();
  },[comlist])


  return (
    <div className='order-list-size'>
        <h3>Orders Completed</h3>
      <table className="table">
  <thead>
    <tr>
    <th scope="col">Completion-Id</th>
      <th scope="col">Order-Id</th>
      <th scope="col">Product-Id</th>
      <th scope="col">Product Name</th>
      <th scope="col">Customer-Id</th>
      <th scope="col">Quantity</th>
      <th scope="col">Date</th>

    </tr>
  </thead>
  <tbody>
    {
      comlist.map((ele)=>(
      <tr key={ele.Complete_id}>
      <th scope="row">{ele.Complete_id}</th>
      <td>{ele.Order_Id}</td>
      <td>{ele.Product_Id}</td>
      <td>{ele.Product_Name}</td>
      <td>{ele.Customer_id}</td>
      <td>{ele.Quantity}</td>
      <td>{ele.Date.split('T')[0]}</td>
    </tr>
      ))
    }
  </tbody>
</table>
    </div>
  )
}

export default CompletedOrders
