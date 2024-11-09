import React from 'react'

function ProductsComponents(props) {

    const {filteredProducts}=props

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
  return (
    <div className='products-page'>
        <div className="product-inner ">
            <div className="products-cards-container">

               {
                filteredProducts.map((prod,index)=>(
                    <div className="card" style={styles.card}>
                    
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
                        <h5 className="card-title text-uppercase fw-semibold">{prod.title}</h5>
                        <p className="card-text text-muted small">{}</p>
                        <p className="mb-2" style={styles.price}>${prod.price}</p>
                        
                        {/* Add to cart button */}
                        <button className="btn btn-success w-100 fw-semibold">
                            ADD TO CART
                        </button>
                    </div>
                </div>
                ))


               }

                

                

                </div>

                

        </div> 
    </div>
  )
}

export default ProductsComponents
