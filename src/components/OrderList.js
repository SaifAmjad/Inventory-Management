import React, { useEffect, useState } from 'react'

const OrderList = () => {

  const[orderlist,setOrderlist]=useState([]);


  const fetchData=async()=>{
    try {
      const res=await fetch('http://localhost:5000/orders');
      const data=await res.json();
      setOrderlist(data);
    } catch (error) {
      console.log(error);
    }
  }


  const orderClick=async(e,index)=>{
      
      const confirm=window.confirm('Are you sure to complete this order?');
      if(confirm){
        const oid=orderlist[index].Order_Id;
        const pid=orderlist[index].Product_Id;
        const pname=orderlist[index].Product_Name;
        const custom_id=orderlist[index].Customer_id;
        const quantity=orderlist[index].Quantity;
        
        console.log(orderlist)
        try {
          const res=await fetch(`http://localhost:5000/orders/completed`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({oid,pid,pname,custom_id,quantity})
          });
  
          console.log(res);
  
        } catch (error) {
          alert(error)
        }
      }
     
  }

  const deleteOrder=async(id)=>{
    const confirm=window.confirm('Are you sure this order got rejected?');
    if(confirm){
      try {
        const res=await fetch(`http://localhost:5000/orders`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({id})
            });
    
            console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    
  }


  useEffect(()=>{
    fetchData();
    
  },[orderlist]);

  return (
    <div className='custom-orderlist'>
        <h3>Orders</h3>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Order-Id</th>
      <th scope="col">Product-Id</th>
      <th scope="col">Product Name</th>
      <th scope="col">Customer-Id</th>
      <th scope="col">Quantity</th>
      <th scope="col">Actions</th>
      
      
    </tr>
  </thead>
  <tbody>
    {
      orderlist.map((ele,index)=>{
        return(
          <tr key={ele.Order_Id}>
          <td>{ele.Order_Id}</td>
          <td>{ele.Product_Id}</td>
          <td>{ele.Product_Name}</td>
          <td>{ele.Customer_id}</td>
          <td>{ele.Quantity}</td>
          <td>
            <i style={{cursor:'pointer',marginRight:'15px'}}  onClick={(e)=>{orderClick(e,index)}} className="fa-solid fa-check"></i>
            <i style={{cursor:'pointer'}} onClick={()=>{deleteOrder(ele.Order_Id)}} className="fa-solid fa-trash"></i>
            </td>
        </tr>
        )
      })
    }
  </tbody>
</table>
    </div>
  )
}

export default OrderList
