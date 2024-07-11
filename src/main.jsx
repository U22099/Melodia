import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LogIn from './LogIn.jsx'
import Register from './Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/Melodia'>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="homepage" element={<App/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
