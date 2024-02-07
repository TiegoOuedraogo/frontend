import axios from './axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const addToCart = async (productDetails) => {
    try {
        const response = await axios.post(`${API_URL}/api/cart/addToCart`, productDetails);
        console.log("Adding items: ", response);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;  
    }
};


const getCartItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/cart/items`);
        console.log("Gettin cart items ",response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateCartItem = async (productId, quantity) => {
    try {
        const response = await axios.put(`${API_URL}/api/cart/update`, { productId, quantity });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};

const removeFromCart = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/cart/remove/${productId}`);
        console.log("Removing product with ID:", productId);
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};

// Clear the cart
export const clearCart = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/cart/clear`);
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

  