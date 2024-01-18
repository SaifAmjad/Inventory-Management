import React from 'react'
import { useParams } from 'react-router-dom'
import ProductList from './ProductList'
import Products from './Products'


const CatagoriesList = ({setBar}) => {
    const {value}=useParams();
  return (
    <div>
      <Products value={value} setBar={setBar}/>
    </div>
  )
}

export default CatagoriesList
