import axios from 'axios'

const baseUrl='https://dummyjson.com'

const getProducts=async ()=>{

try {
    const response = await axios.get(`${baseUrl}/products`, );
    return response.data;
  } catch (error) {
   
    if (error.response && error.response.status === 400) {
      return null
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }

}

const prodServices={
    getProducts
}

export default prodServices