import { useEffect, useState } from 'react';
import './App.css';
import Catagories from './components/Catagories';
import CatagoriesList from './components/CatagoriesList';
import Customers from './components/Customers';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Products from './components/Products';
import Sidebar from './components/Sidebar';
import Signup from './components/Signup';
import PrivateRoutes from './utils/PrivateRoutes';


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Cookies from 'js-cookie';


function App() {
  let[bar,setBar]=useState(false);

  return (
    <>
    <BrowserRouter>
    {bar===false?'':<Sidebar setBar={setBar}/>}
    <Routes> 
    <Route element={<PrivateRoutes/>}>
    <Route exact path="/" element={<Products setBar={setBar} />}/>
    <Route exact path="/orders" element={<Orders setBar={setBar}/>} />
    <Route exact path="/dashboard" element={<Dashboard setBar={setBar}/>} />
    <Route exact path="/customers" element={<Customers setBar={setBar}/>} />
    <Route exact path="/products/catagories" element={<Catagories setBar={setBar}/>} />
    <Route exact path="/catagories/list/:value" element={<CatagoriesList setBar={setBar}/>} />
    </Route>

    <Route exact path="/signup" element={<Signup setBar={setBar} />}/>
    </Routes>
    </BrowserRouter>
    </> 
   
  );
}

export default App;
