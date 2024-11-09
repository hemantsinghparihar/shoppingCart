import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {  
  const navigate=useNavigate();
    const handleLogout=()=>{

        localStorage.clear()
        navigate('/',{ replace: true } )
    }

    useEffect(()=>{
        const userData=localStorage.getItem('user')
    },[])
    return (
        <nav className="navbar bg-light px-3">
        {/* Left - Logo */}
        <div className="navbar-brand">
          {/* <img
            src="https://via.placeholder.com/40" // Replace with your logo URL
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          /> */}
          <span className="ms-2">MyApp</span> {/* Optional app name */}
        </div>
        <div>

        </div>

        <form className="d-flex mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className='' style={{border:'none',outline:'none',background:'none'}}  type="submit"><i class="ri-search-line"></i></button>
      </form>

  
        {/* Right - User icon and text */}
        <div className="d-flex align-items-center">
            <i class="ri-user-3-fill"></i> 
          <div className='d-flex justify-content-center align-items-center mx-4 '>
            <button onClick={handleLogout} className='btn btn-primary btn-md'>Logout</button>
          </div>
        </div>
      </nav>
  )
}

export default Header
