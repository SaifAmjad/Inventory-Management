import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Sidebar = ({setBar}) => {
    let[user,setUser]=useState({name:""});
    const navigate=useNavigate();

    const fetchToken=async()=>{
        const res=await fetch(`http://localhost:5000/signup`, {
              method: 'GET',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              }
            });
        const data=await res.json();
        let nameValue=data.name.toLowerCase();
        let upperValue=nameValue[0].toUpperCase();
        const userName=upperValue.concat(nameValue.slice(1))
        
        setUser({name:userName});
    }

    const logOut=()=>{
        const confirm=window.confirm('Are you sure, you want to LogOut?');

        if(confirm){
            Cookies.remove('token');
            setBar(false);
            navigate('/signup');
        }
        
    }

    useEffect(()=>{
        fetchToken();
    },[]);


  return (
    <>
      <nav className="main-menu">
            <ul>
                <li className='has-subnav'>
                    <Link to="/">
                        <i className="fa fa-home"></i>
                        <span className="nav-text">
                           Product Listing
                        </span>
                    </Link>
                    
                </li>
                <li className="has-subnav">
                    <Link to="/orders">
                        <i className="fa fa-business-time"></i>
                        <span className="nav-text">
                            Order Listing
                        </span>
                    </Link>
                    
                </li>
                <li className="has-subnav">
                    <Link to="/dashboard">
                       <i className="fa fa-dashboard"></i>
                        <span className="nav-text">
                            Dashboard
                        </span>
                    </Link>
                    
                </li>
                <li className="has-subnav">
                    <Link to="/customers">
                       <i className="fa fa-user-group"></i>
                        <span className="nav-text">
                            Customers
                        </span>
                    </Link>
                </li>
            </ul>
            <ul style={{marginTop:"13.5pc"}}>
                <li style={{marginTop:"30px"}}>
                    <i onClick={logOut} className="fa-2x fa-solid fa-circle-user custom-person-icon"></i>
                    <h5 style={{position:"absolute",left:"65px",bottom:"32px",color:"#b8b5b5"}}>{user.name}</h5>
                </li>
            </ul>
        </nav>

      
    </>
  )
}

export default Sidebar
