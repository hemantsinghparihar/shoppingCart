import axios from 'axios'

const baseUrl='https://dummyjson.com'

const loginUser=async (userData)=>{
console.log('✌️userData --->', userData);
try {
    const response = await axios.post('https://dummyjson.com/user/login', userData);
    return response.data;
  } catch (error) {
   
    if (error.response && error.response.status === 400) {
      return null
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }

}

const authServices={
    loginUser
}

export default authServices