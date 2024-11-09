import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet,useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './component/Header'

function App() {
  const location=useLocation()

  return (
    <div>
      <ToastContainer />
      {location.pathname !== '/' && <Header />}
      <Outlet/>
    </div>
  )
}

export default App
