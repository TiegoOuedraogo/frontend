import axiosInstance from './axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const addToCart = async (productDetails) => {
    console.log('URL:', `${API_URL}/api/cart/addToCart`);
    console.log('Sending Data:', productDetails);
    try {
        const response = await axiosInstance.post(`${API_URL}/api/cart/addToCart`, productDetails);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const cartApi = {
    addToCart,
  };
  
  export default cartApi;

  