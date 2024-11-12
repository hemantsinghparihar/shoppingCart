import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setCartData,removeFromCart } from '../features/shoppingSlice';



function ProductsComponents(props) {
    const dispatch=useDispatch()
    const {filteredProducts}=props

    const [inCart,setInCart]=useState(true)


    const cartData=useSelector((state)=>state.shop.cartData)
    console.log('✌️cartData --->', cartData);

    const searchQuery=useSelector((state)=>state.shop.searchQuery)
console.log('✌️searchQuery  in the products component--->', searchQuery);

    const searchResults=useSelector((state)=>state.shop.searchResults.products)
console.log('✌️searchResults inside products display component --->', searchResults);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
      }, [filteredProducts]);

    // Calculate the products for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const styles = {
        imageContainer: {
          height: '230px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflow:'hidden'
        },
        image: {
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
        },
        price: {
          color: '#198754',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        },
      };

      const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
        }
      };

      // const handleAddToCart=(prod)=>{
        
      //   if (!cartData.some((item) => item.id === prod.id)) {
      //     dispatch(setCartData([...cartData, prod]));
      //   }
      // }

      const handleAddToCart = (prod) => {
        // Check if the product already exists in the cart
        const existingItem = cartData.find((item) => item.id === prod.id);
    
        if (existingItem) {
            // If the product is already in the cart, increment its quantity
            dispatch(setCartData(cartData.map((item) =>
                item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
            )));
        } else {
            // If the product is new in the cart, add it with quantity set to 1
            dispatch(setCartData([...cartData, { ...prod, quantity: 1 }]));
        }
    };
  return (
    <div className='products-page'>
        <div className="product-inner ">
            <div className="products-cards-container">

               {!searchQuery &&
                currentProducts.map((prod,index)=>(
                    <div className="card " style={styles.card}>
                    
                    <div style={styles.imageContainer}>
                        <img
                        src={prod.images[0]}
                        // alt={name}
                        // style={styles.image}
                        className="img-fluid"
                        />
                    </div>

                    {/* Product details */}
                    <div className="card-body w-100 p-0 mt-3">
                        <h6 className="card-title text-uppercase fw-semibold">{prod.title.slice(0,22)}</h6>
                        <p className="card-text text-muted small">{prod.description.slice(0,30)}...</p>
                        <p className="mb-2" style={styles.price}>${prod.price}</p>
                        
                        {/* Add to cart button */}
                        <button className={`btn   w-100 fw-semibold 
                          ${cartData.some(one=>one.id==prod.id)?'btn-success':'btn-primary'}
                        `}
                        onClick={()=>{handleAddToCart(prod)}}
                        >
                            {cartData.some(one=>one.id==prod.id)? 'ADDED TO CART':'ADD TO CART'}
                        </button>
                    </div>
                </div>
                ))


               }

               {searchQuery &&
                searchResults.map((prod,index)=>(
                  <div className="card " style={styles.card}>
                  
                  <div style={styles.imageContainer}>
                      <img
                      src={prod.images[0]}
                      // alt={name}
                      // style={styles.image}
                      className="img-fluid"
                      />
                  </div>

                  {/* Product details */}
                  <div className="card-body w-100 p-0 mt-3">
                      <h6 className="card-title text-uppercase fw-semibold">{prod.title.slice(0,22)}</h6>
                      <p className="card-text text-muted small">{prod.description.slice(0,30)}...</p>
                      <p className="mb-2" style={styles.price}>${prod.price}</p>
                      
                      {/* Add to cart button */}
                      <button className={`btn   w-100 fw-semibold 
                        ${cartData.some(one=>one.id==prod.id)?'btn-success':'btn-primary'}
                      `}
                      onClick={()=>{handleAddToCart(prod)}}
                      >
                          {cartData.some(one=>one.id==prod.id)? 'ADDED TO CART':'ADD TO CART'}
                      </button>
                  </div>
              </div>
              ))

               }

                        

                

                </div>                

        </div> 

             {/* Pagination Controls */}  

             {!searchQuery &&
              <div className="pagination-controls mt-3 d-flex justify-content-center ">  
                    <button 
                        onClick={() => goToPage(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="btn btn-outline-secondary mx-1"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-secondary'} mx-1`}
                        >
                        {i + 1}
                        </button>
                    ))}
                    <button 
                        onClick={() => goToPage(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="btn btn-outline-secondary mx-1"
                    >
                        Next
                    </button>
                </div>}
    </div>
  )
}

export default ProductsComponents
