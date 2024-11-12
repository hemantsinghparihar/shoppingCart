import axios from 'axios'
import config from '../config/config';

const baseUrl=config.baseUrl

// const getProducts=async ()=>{

// try {
//     const response = await axios.get(`${baseUrl}/products`, );
//     return response.data;
//   } catch (error) {
   
//     if (error.response && error.response.status === 400) {
//       return null
//     } else {
//       throw new Error('An unexpected error occurred. Please try again.');
//     }
//   }

// }

const searchProducts=async (query)=>{
  const response=await axios.get(`${baseUrl}/products/search?q=${query}`)
  return response.data
}

const getCategory=async()=>{
  const response=await axios.get(`${baseUrl}/products/category-list`)
  return response.data
}
const prodServices={
    
    searchProducts,
    getCategory
}

export default prodServices