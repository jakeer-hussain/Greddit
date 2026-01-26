// import { useState } from "react";
import "./dashboard.css"
import NavBar from "./navbar"

export default function Dashboard() {
    return (
        <>
        <div className="dashboard-background">
        <NavBar/>
        <div className = "welcomescreendiv">
            <h1 className="heading"> Welcome to Our <span className="greddit">Greddit</span> </h1>
            <p className="quote"> This is the place where you can connect without limits!!! </p>
        </div> 
        </div>
        </>
    )
}