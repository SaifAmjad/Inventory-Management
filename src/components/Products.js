import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";

const Products = ({value,setBar}) => {

  let[data,setData]=useState({id:"",name:"",quantity:"",price:"",catagory:"",sku:"",cost:""});
  let[showForm,setShowForm]=useState(false);
  let[update,setUpdate]=useState(false);
  let[catagory,setCatagory]=useState(false);

  const addProduct=async(id,name,quantity,price,catagory,sku,cost)=>{
        try {
          const res=await fetch(`http://localhost:5000/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id,name,quantity,price,sku,catagory,cost})
          });
        } catch (error) {
          console.log(error);
        }
  }

  const updateProduct=async(id,name,quantity,price,catagory,sku,cost)=>{
    try {  
      const res=await fetch(`http://localhost:5000/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id,name,quantity,price,catagory,sku,cost})
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onchange=(e)=>{
    setData({...data,[e.target.name]: e.target.value});
  }

  const updateClick=()=>{
    updateProduct(data.id,data.name,data.quantity,data.price,data.catagory,data.sku,data.cost);
    setData({id:"",name:"",quantity:"",price:"",catagory:"",sku:"",cost:""});
    setShowForm(false);
    setUpdate(false);
  }

  const handleclick=()=>{
        addProduct(data.id,data.name,data.quantity,data.price,data.catagory,data.sku,data.cost);
        setData({id:"",name:"",quantity:"",price:"",catagory:"",sku:"",cost:""});
        setShowForm(false);
  }

  useEffect(()=>{
    setBar(true);
  },[])

  return (
    <div className="custom-form">
      <h5 style={{position:"absolute",left:"170px",top:"18px"}}>
         {catagory===true?value:'All Products'}
    </h5>

    {
      catagory===true && showForm===false? <Link to='/products/catagories'><button onClick={()=>{
        setUpdate(false);
        }} style={{position:"absolute",left:"10.6pc",top:"50px",width:"4pc",height:"36px"}} type="button" className="btn btn-danger">
          Back</button></Link>:''
    }

    {
      showForm===false && catagory===false? <Link to='/products/catagories'><button style={{position:"absolute",left:"59pc",top:"40px",width:"10pc",height:"40px"}} type="button" className="btn btn-danger">
          Catagories</button> </Link>:""
    }

      {showForm===false?<button onClick={()=>{setShowForm(true)
      setUpdate(false);
      }} style={{position:"relative",left:"70pc",top:"40px",width:"10pc",height:"40px"}} type="button" className="btn btn-outline-primary">Add new product</button>
      :
<form>
        <div className="mb-3 custom-form-1">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Product-Id
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={data.id}
            onChange={onchange}
            aria-describedby="emailHelp"
            required
            disabled={update===true?true:false}
            
          />
        </div>
        <div className="mb-3 custom-form-2">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="p-name"
            name="name"
            value={data.name}
            onChange={onchange}
            required
          />
        </div>
        <div className="mb-3 custom-form-q">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="quantity"
            value={data.quantity}
            onChange={onchange}
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 custom-form-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="p-price"
            name="price"
            value={data.price}
            onChange={onchange}
            required
          />
        </div>
        <div className="mb-3 custom-form-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Catagory
          </label>
          <input
            type="text"
            className="form-control"
            id="p-catagory"
            name="catagory"
            value={data.catagory}
            onChange={onchange}
            required
          />
        </div>
        <div className="mb-3 custom-form-5">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Cost
          </label>
          <input
            type="text"
            className="form-control"
            id="p-cost"
            name="cost"
            value={data.cost}
            onChange={onchange}
            required
          />
        </div>
        <div className="mb-3 custom-form-sku">
          <label htmlFor="exampleInputPassword1" className="form-label">
            SKU
          </label>
          <input
            type="text"
            className="form-control"
            id="p-sku"
            name="sku"
            value={data.sku}
            onChange={onchange}
            required
          />
        </div>

        {update===false?<button type="submit" onClick={handleclick} className="btn btn-primary custom-btn-1">
          Add Product
        </button>:
        <button type="submit" onClick={updateClick} className="btn btn-danger custom-btn-1">
          Update
        </button>
        }
        
        <button style={{position:"relative",right:"300px"}} onClick={()=>{
          setShowForm(false);
          setData({id:"",name:"",quantity:"",price:"",catagory:"",sku:""});
        }} type="button" className="btn btn-outline-secondary custom-btn-2">Close</button>

        
      </form>
      }
     
      
     
      <ProductList data={data} setData={setData} setShowForm={setShowForm} setUpdate={setUpdate} catagory={catagory} setCatagory={setCatagory} value={value}/>
      
      
    </div>
  );
};

export default Products;
