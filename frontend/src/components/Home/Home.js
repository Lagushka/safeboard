import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.menu}>
      <h1>Employees list</h1>
      <button>
        <Link to="/list">Go to List</Link>
      </button>
    </div>
  );
}