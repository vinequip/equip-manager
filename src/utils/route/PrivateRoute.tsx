import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store";


function PrivateRoute() {

  const userUID = useSelector((state: RootState) => state.auth.uid)
  
  console.log("privet Route -->", userUID);

  return <>{userUID ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRoute;
