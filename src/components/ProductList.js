import React, { useEffect, useState } from "react";
import "../Custom.css";


const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  let count=1;
  
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editClick=(id)=>{
      const getDetails=products.filter((ele)=>{ return id===ele.Product_Id});
      props.setShowForm(true);
      props.setUpdate(true);
      props.setData({id:getDetails[0].Product_Id,name:getDetails[0].Name,quantity:getDetails[0].Quantity,price:getDetails[0].Price,catagory:getDetails[0].Catagory,sku:getDetails[0].Sku,cost:getDetails[0].Cost});
  }

  const deleteClick=async(id)=>{
    const value=window.confirm('Do you want to delete this?');

    if(value===true){
      try {
        const res=await fetch(`http://localhost:5000/products`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id})
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchProducts();
    if(props.value){
      props.setCatagory(true);
    }
  }, [products]);

  return (
    <>
      <div className="container mt-5 custom-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product-Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost</th>
              <th scope="col">Sku</th>
              <th scope="col">Catagory</th>
              <th scope="col">Action</th>
              
            </tr>
          </thead>
          <tbody>
            { props.catagory===true? products.map((ele)=>{
              
              if(ele.Catagory===props.value){
                return (
                  <tr key={ele.Product_Id}>
                    <th scope="row">{count++}</th>
                    <td>{ele.Product_Id}</td>
                    <td>{ele.Name}</td>
                    <td>{ele.Price} Rs</td>
                    <td>{ele.Quantity}</td>
                    <td>{ele.Cost}</td>
                    <td>{ele.Sku}</td>
                    <td>{ele.Catagory}</td>
                    <td>
                      <i style={{cursor:'pointer',marginRight:'20px'}} onClick={()=>{editClick(ele.Product_Id)}} className="fa-solid fa-pencil"></i>
                      <i style={{cursor:'pointer'}} onClick={()=>{deleteClick(ele.Product_Id)}} className="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                );
              }
            })
            :products.map((ele, index) => {
              return (
                <tr key={ele.Product_Id}>
                  <th scope="row">{index + 1}</th>
                  <td>{ele.Product_Id}</td>
                  <td>{ele.Name}</td>
                  <td>{ele.Price} Rs</td>
                  <td>{ele.Quantity}</td>
                  <td>{ele.Cost}</td>
                  <td>{ele.Sku}</td>
                  <td>{ele.Catagory}</td>
                  <td>
                    <i style={{cursor:'pointer',marginRight:'20px'}} onClick={()=>{editClick(ele.Product_Id)}} className="fa-solid fa-pencil"></i>
                    <i style={{cursor:'pointer'}} onClick={()=>{deleteClick(ele.Product_Id)}} className="fa-solid fa-trash"></i>
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

export default ProductList;
