import axios from 'axios'
import config from '../config/config';

const baseUrl=config.baseUrl

const loginUser=async (userData)=>{
console.log('✌️userData --->', userData);
try {
    const response = await axios.post(`${baseUrl}/user/login`, userData);
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