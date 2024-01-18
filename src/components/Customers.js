import React, { useState,useEffect } from "react";
import CustomersList from "./CustomersList";

const Customers = ({value,setBar}) => {
    let[data,setData]=useState({firstname:"",lastname:"",age:"",email:"",phone:"",id:""});
  let[showForm,setShowForm]=useState(false);
  let[update,setUpdate]=useState(false);


  const addProduct=async(firstname,lastname,age,email,phone)=>{
        try {
          const res=await fetch(`http://localhost:5000/customers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstname,lastname,age,email,phone})
          });
        } catch (error) {
          console.log(error);
        }
  }

  const updateProduct=async(firstname,lastname,age,email,phone,id)=>{
    try {  
      const res=await fetch(`http://localhost:5000/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstname,lastname,age,email,phone})
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onchange=(e)=>{
    setData({...data,[e.target.name]: e.target.value});
  }

  const updateClick=()=>{
    updateProduct(data.firstname,data.lastname,data.age,data.email,data.phone,data.id);
    setData({firstname:"",lastname:"",age:"",email:"",phone:""});
    setShowForm(false);
    setUpdate(false);
  }

  const handleclick=()=>{
        addProduct(data.firstname,data.lastname,data.age,data.email,data.phone);
        setData({firstname:"",lastname:"",age:"",email:"",phone:""});
        setShowForm(false);
  }

  useEffect(()=>{
    setBar(true);
  },[])

  return (
    <div className="custom-form">
      <h5 style={{position:"absolute",left:"170px",top:"18px"}}>
         Customer List
    </h5>


      {showForm===false?<button onClick={()=>{setShowForm(true)
      setUpdate(false);
      }} style={{position:"relative",left:"70pc",top:"40px",width:"10pc",height:"40px"}} type="button" className="btn btn-outline-primary">Add new customer</button>
      :
<form className="container" style={{marginTop:"20px",width:"50pc",marginLeft:"22pc"}}>
    <div className="row">
    <div className="col">
          <label htmlFor="exampleInputEmail1" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            value={data.firstname}
            onChange={onchange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="col">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            value={data.lastname}
            onChange={onchange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={data.age}
            onChange={onchange}
            required
            aria-describedby="emailHelp"
          />
        </div>
    </div>
        <div className="row">
       
        <div className="col">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            onChange={onchange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={onchange}
            required
          />
        </div>
        <div className="col mt-3" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <button onClick={()=>{
          setShowForm(false);
          setData({firstname:"",lastname:"",age:"",email:"",phone:""});
        }} type="button" className="btn btn-outline-secondary m-3">Close</button>

{update===false?<button type="submit" onClick={handleclick} className="btn btn-primary ">
          Add Customer
        </button>:
        <button type="submit" onClick={updateClick} className="btn btn-danger">
          Update
        </button>
        }
        </div>
        </div>    
      </form>
}

       <CustomersList data={data} setData={setData} setShowForm={setShowForm} setUpdate={setUpdate} showForm={showForm} />
      </div>
     );
}

export default Customers
