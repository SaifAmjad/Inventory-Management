import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Signup = (props) => {
 
    const[user,setUser]=useState({name:"",email:"",pass:""});   
    const navigate=useNavigate();
    const handleclick=async(e)=>{
         e.preventDefault();
        
        if(!user.name || !user.email || !user.pass){
            alert('Please input all the fields');
        }
        try {
            const res=await fetch(`http://localhost:5000/signup`, {
              method: 'POST',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name:user.name,email:user.email,pass:user.pass})
            });
            props.setBar(true);
            navigate('/');
            

          } catch (error) {
            console.log(error);
          }
    } 

    const onChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
   
    useEffect(()=>{
        Cookies.remove('token');
    },[])

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row">
        <div
          className="col-5"
          style={{ height: "100vh", backgroundColor: "white" }}
        >
            <img style={{ width: "6pc", marginTop: "15px",marginLeft:"15px" }} src="https://img.freepik.com/free-vector/warehouse-logistics-isometric-design_1284-18761.jpg?size=626&ext=jpg&ga=GA1.1.286214136.1704564082&semt=ais" alt="" />
          <img
            style={{ width: "32pc",marginTop:"-12px" }}
            src="https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg"
            alt=""
          />
        </div>
        <div className="col-7" style={{ height: "100vh" }}>
          <div style={{marginTop:"6pc",marginLeft:"8pc"}}>
            <h2 style={{ fontWeight: "700" }}>Welcome to Ecom-Inventory!</h2>
            <h6 style={{ color: "#b8b5b5" }}>Register your account</h6>
          </div>
          <div style={{marginTop:"25px",width:"25pc",marginLeft:"8pc"}}>
            <form>
            <div class="mb-2">
                <h6 for="exampleInputPassword1" class="form-label">
                  Name
                </h6>
                <input
                  type="text"
                  class="form-control"
                  value={user.name}
                  id="name"
                  name="name"
                  onChange={onChange}
                />
              </div>
              <div class="mb-2">
                <h6 for="exampleInputEmail1" class="form-label">
                  Email address
                </h6>
                <input
                  type="email"
                  class="form-control"
                  value={user.email}
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-2">
                <h6 for="exampleInputPassword1" class="form-label">
                  Password
                </h6>
                <input
                  type="password"
                  class="form-control"
                  value={user.pass}
                  id="pass"
                  name="pass"
                  onChange={onChange}
                />
              </div>
              <button type="submit" onClick={handleclick} className="btn btn-primary w-25" style={{marginTop:"15px",borderRadius:"25px"}}>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

