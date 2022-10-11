import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Employees list</h1>
      <button>
        <Link to="/list">Go to List</Link>
      </button>
    </div>
  );
}