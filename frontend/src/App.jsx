import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  )
}



export default App
