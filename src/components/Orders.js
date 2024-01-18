import React, { useEffect, useState } from 'react'
import OrderList from './OrderList'
import CompletedOrders from './CompletedOrders'




const Orders = ({setBar}) => {

  let[orders,setOrders]=useState({pid:"",pname:"",quantity:"",cid:"",cname:""});

  const addOrders=async(pid,pname,quantity,cid,cname)=>{
    try {
      const res=await fetch(`http://localhost:5000/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pid,pname,quantity,cid,cname})
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleclick=()=>{
    addOrders(orders.pid,orders.pname,orders.quantity,orders.cid,orders.cname);
    setOrders({pid:"",pname:"",quantity:"",cid:"",cname:""})
  }

  const onchangehandle=(e)=>{
      setOrders({...orders,[e.target.name]:e.target.value});
  }

  useEffect(()=>{
    setBar(true);
  })

  return (
    <div style={{backgroundColor:'rgb(248, 248, 248)',color:'Black'}}>
    
    <div className='custom-order-form'>
       <form>
        <div className="mb-3 custom-form-1 input-position-1">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Product-Id
          </label>
          <input
            type="text"
            className="form-control"
            id="pid"
            name='pid'
            value={orders.pid}
            onChange={onchangehandle}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 custom-form-2 input-position-2">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="pname"
            name='pname'
            value={orders.pname}
            onChange={onchangehandle}
          />
        </div>
        <div className="mb-3 custom-form-3 input-position-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            name="quantity"
            value={orders.quantity}
            onChange={onchangehandle}
          />
        </div>
        <div className="mb-3 custom-form-4 input-position-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Customer-id
          </label>
          <input
            type="text"
            className="form-control"
            id="cid"
            name='cid'
            value={orders.cid}
            onChange={onchangehandle}
          />
        </div>
        <div className="mb-3 custom-form-4 input-position-5">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="cname"
            name='cname'
            value={orders.cname}
            onChange={onchangehandle}
          />
        </div>

        <button type="submit" onClick={handleclick} className="btn btn-primary custom-btn-order btn-position">
          Add Order
        </button>
      </form>


    </div>
    <OrderList/>
    <CompletedOrders/>

    </div>
  )
}

export default Orders
