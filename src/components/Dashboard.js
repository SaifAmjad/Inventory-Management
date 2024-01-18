import React, { useEffect } from "react";
import DashboardTotal from "./DashboardTotal";

const Dashboard = ({setBar}) => {
  
  useEffect(()=>{
    setBar(true);
  },[])
  return (
   <>
   <DashboardTotal/>

   </>
  );
};

export default Dashboard;
