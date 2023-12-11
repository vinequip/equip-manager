import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <div className="container">
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
     <Footer/>
    </div>
  );
}

export default Layout;
