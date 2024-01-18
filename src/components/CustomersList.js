import React, { useEffect, useState } from "react";
import "../Custom.css";

const CustomersList = (props) => {
    const [customers, setCustomers] = useState([]);
    
    
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:5000/Customers");
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const editClick=(id)=>{
        const getDetails=customers.filter((ele)=>{ return id===ele.CustomerId});
        props.setShowForm(true);
        props.setUpdate(true);
        props.setData({firstname:getDetails[0].FirstName,lastname:getDetails[0].LastName,age:getDetails[0].Age,email:getDetails[0].Email,phone:getDetails[0].Phone,id:getDetails[0].CustomerId});
    }
  
    
    const deleteClick=async(id)=>{
      const value=window.confirm('Do you want to delete this?');
  
      if(value===true){
        try {
          const res=await fetch(`http://localhost:5000/customers/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  
    useEffect(() => {
      fetchCustomers();
    }, [customers]);
  
    return (
      <>
        <div className="container custom-container"  style={{marginTop:props.showForm===false?"50px":"90px"}} >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer-Id</th>
                <th scope="col">FisrtName</th>
                <th scope="col">LastName</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Contact no</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              { customers.map((ele, index) => {
                return (
                  <tr key={ele.CustomerId}>
                    <th scope="row">{index + 1}</th>
                    <td>{ele.CustomerId}</td>
                    <td>{ele.FirstName}</td>
                    <td>{ele.LastName}</td>
                    <td>{ele.Age}</td>
                    <td>{ele.Email}</td>
                    <td>{ele.Phone}</td>
                    <td>
                      <i style={{cursor:'pointer',marginRight:'20px'}} onClick={()=>{editClick(ele.CustomerId)}} className="fa-solid fa-pencil"></i>
                      <i style={{cursor:'pointer'}} onClick={()=>{deleteClick(ele.CustomerId)}} className="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
};


export default CustomersList
