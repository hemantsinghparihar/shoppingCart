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
          <form className="d-none d-md-flex mx-auto search-bar" style={{ maxWidth: '400px', width: '100%' }}>
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
