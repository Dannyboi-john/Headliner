import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent"
import ProtectedRoute from './utilities/ProtectedRoute';
import EventPage from "./pages/EventPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/CreateEvent" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
