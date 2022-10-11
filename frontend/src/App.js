import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.scss";
import Home from "./components/Home.js";
import List from "./components/List.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
