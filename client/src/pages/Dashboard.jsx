import React,{useState,useEffect} from 'react'
import prodServices from '../services/productsApi';
import ProductsComponents from '../component/ProductsComponents';

function Dashboard() {
  const [activeTab, setActiveTab]=useState(0)
  const [products,setProducts]=useState([]);
console.log('✌️products --->', products);

  useEffect(()=>{
    prodServices.getProducts().then((res)=>{
      console.log('✌️res --->', res);
      setProducts(res.products)
      
    })
  },[])

  const categories = ['All', 'Beauty', 'Furniture', 'Groceries'];

  const filteredProducts=activeTab===0
  ? products:
  products?.filter(product=>
    product.category.toLowerCase()===categories[activeTab].toLowerCase()
  )

  console.log('✌️filteredProducts --->', filteredProducts);
  
  return (
    <div>
      <div className="inner-dash container-fluid  ">
        <div className="categories row justify-content-center ">
        <div className="d-flex justify-content-around border-bottom" style={{ width: '100%' }}>
            {categories.map((one,index)=>(
               <p 
              //  className='fw-bold text-secondary my-2 p-2  border-bottom border-2 
              //  border-primery'
               className={`fw-bold my-2 p-2 ${activeTab === index ? 'text-primary border-bottom border-2 border-primary' : 'text-secondary '}`} 
               onClick={() => setActiveTab(index)}
               style={{cursor:'pointer'}}
               >
                {one}
               </p>
            ))}
        </div>

        </div>

        <ProductsComponents filteredProducts={filteredProducts}/>
      </div>
    </div>
  )
}

export default Dashboard
