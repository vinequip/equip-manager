import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store";


function PrivateRoute() {

  const userRole= useSelector((state: RootState) => state.auth.role)
  
  console.log("privet userRole -->", userRole);

  return <>{(userRole === 'admin') ? <Outlet /> : <Navigate to="/workers" />}</>;
}

export default PrivateRoute;
