import React from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.scss";

export default function Home() {
  return (
    <div className={classes.home}>
      <h1>Employees list</h1>
        <Link to="/list"><button>Go to list</button></Link>
    </div>
  );
}