// import React, { useEffect,useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { setSearchResults, setSearchQuery, searchProductsRequest } from '../features/shoppingSlice';



// const useDebounce=(value,delay)=>{
//   const [debouncedValue,setDebouncedValue]=useState(value)
//   useEffect(()=>{
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     // Cleanup the timer if the value changes before the delay finishes
//     return () => {
//       clearTimeout(handler);
//     };
//   },[value,delay])
  
  
//   return debouncedValue
// }

// function Header() {  
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
  
//   // Select search query and debounced query for search functionality
//   const searchQuery = useSelector((state) => state.shop.searchQuery);
//   const debouncedQuery = useDebounce(searchQuery, 800);

//   // Trigger search action if there is a debounced query
//   useEffect(() => {
//     if (debouncedQuery) {
//       dispatch(searchProductsRequest(debouncedQuery));
//     }
//   }, [debouncedQuery, dispatch]);

//   // Handle logout functionality
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/', { replace: true });
//   };

//   // Update search query in Redux store on input change
//   const handleSearchQuery = (e) => {
//     dispatch(setSearchQuery(e.target.value));
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
//       {/* Left - Logo */}
//       <Link to="/" className="navbar-brand">
//         MyApp
//       </Link>

//       {/* Bootstrap Hamburger Icon for Mobile */}
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarNav"
//         aria-controls="navbarNav"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       {/* Collapsible Navbar */}
//       <div className="collapse navbar-collapse" id="navbarNav">
//         {/* Search bar - only displayed when not on the cart page */}
//         {location.pathname !== '/cart' && (
//           <form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: '400px', width: '100%' }}>
//             <input
//               className="form-control me-2"
//               type="search"
//               placeholder="Search..."
//               aria-label="Search"
//               value={searchQuery}
//               onChange={handleSearchQuery}
//             />
//           </form>
//         )}

//         {/* Right - Links and Buttons */}
//         <ul className="navbar-nav ms-auto d-flex align-items-center">
//           <li className="nav-item">
//             <Link to="/cart" className="nav-link">
//               <i className="ri-shopping-cart-2-fill"></i>
//             </Link>
//           </li>
//           <li className="nav-item">
//             <i className="ri-user-3-fill mx-2"></i>
//           </li>
//           <li className="nav-item">
//             <button onClick={handleLogout} className="btn btn-primary btn-sm ms-2">
//               Logout
//             </button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Header;





import React, {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,Link,useLocation } from 'react-router-dom'
import { setSearchResults,setSearchQuery,searchProductsRequest } from '../features/shoppingSlice';
import prodServices from '../services/productsApi';


const useDebounce=(value,delay)=>{
  const [debouncedValue,setDebouncedValue]=useState(value)
  useEffect(()=>{
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timer if the value changes before the delay finishes
    return () => {
      clearTimeout(handler);
    };
  },[value,delay])
  
  
  return debouncedValue
}



function Header() {  
  const navigate=useNavigate();
  const location=useLocation()
  const dispatch=useDispatch()
  console.log('✌️location --->', location.pathname);
  const products=useSelector((state)=>state.shop.products)
  console.log('✌️products in headers--->', products);

  // const [searchQuery,setSearchQuery]=useState('')
  const searchQuery=useSelector((state)=>state.shop.searchQuery)

  const debouncedQuery = useDebounce(searchQuery, 800);

  
    // const searchResults=products.filter((one)=>(
    //   one.title.toLowerCase().includes(searchQuery.toLowerCase())
    // )) 
    // dispatch(setSearchResults(searchResults)) 
  
  useEffect(()=>{
    if(debouncedQuery){
      // prodServices.searchProducts(debouncedQuery).then(res=>{
      // console.log('✌️res of search--->', res);
      // dispatch(setSearchResults(res.products)) 
        
      // })

      dispatch(searchProductsRequest(debouncedQuery))



    }
  },[debouncedQuery, dispatch])
 

  
    const handleLogout=()=>{

        localStorage.clear()
        navigate('/',{ replace: true } )
    }

    useEffect(()=>{
        const userData=localStorage.getItem('user')
    },[])

    const handleSearchQuery=(e)=>{
      dispatch(setSearchQuery(e.target.value));

    }

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

        {
          location.pathname!=='/cart' && 
          <form className="d-flex mx-auto " style={{ maxWidth: '400px', width: '100%' }}>
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e)=>{handleSearchQuery(e)}}
            />
            {/* <button className='' style={{border:'none',outline:'none',background:'none'}}  type="submit"><i class="ri-search-line"></i></button> */}
          </form>
        }

  
        {/* Right - User icon and text */}
        <div className="d-flex align-items-center">
          <Link to={'/cart'} className='mx-2' style={{textDecoration:'none',color:'black'}}><i class="ri-shopping-cart-2-fill "></i></Link>
            
            <i class="ri-user-3-fill"></i> 
          <div className='d-flex justify-content-center align-items-center mx-4 '>
            <button onClick={handleLogout} className='btn btn-primary btn-md'>Logout</button>
          </div>
        </div>
      </nav>
  )
}

export default Header
