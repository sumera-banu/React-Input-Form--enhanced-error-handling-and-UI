import { useState } from 'react'
import { Routes,Route } from "react-router-dom";
import Register from './screens/register.jsx'
import Result from './screens/result.jsx'
import './App.css'

function App() {
  return(
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/register" element={<Register />} />
    <Route path="/result" element={<Result />} />
</Routes>
)}

export default App
