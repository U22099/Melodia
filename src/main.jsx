import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LogIn from './LogIn.jsx'
import Register from './Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/Melodia' fallback={<LogIn/>}>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="homepage" element={<App/>}/>
        <Route path="*" element={<App/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
