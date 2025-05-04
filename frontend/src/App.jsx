import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./pages/Home";
import SomewhereElse from "./pages/SomewhereElse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SomewhereElse" element={<SomewhereElse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
