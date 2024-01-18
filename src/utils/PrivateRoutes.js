import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
   const token=Cookies.get('token');
   
   console.log(token);
  return (
    token? <Outlet/> : <Navigate to="/signup"/>
  )
}

export default PrivateRoutes
