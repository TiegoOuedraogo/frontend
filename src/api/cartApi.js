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

const getCartItems = async (userId) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/api/cart/users/${userId}/cart`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateCartItem = async (productId, quantity) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/api/cart/update`, { productId, quantity });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const removeFromCart = async (productId) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/api/cart/remove`, { productId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const clearCart = async () => {
    try {
        const response = await axiosInstance.post(`${API_URL}/api/cart/clear`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const cartApi = {
    addToCart,
    getCartItems,
    updateCartItem,
    removeFromCart,
    clearCart,
};
  
export default cartApi;

  