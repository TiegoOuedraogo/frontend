import axios from './axios'; 

const addToCart = async (productDetails) => {
    try {
        const response = await axios.post(`/api/cart/addToCart`, productDetails);
        console.log("Adding items: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;  
    }
};


const getCartItems = async () => {
    try {
        const response = await axios.get(`/api/cart/items`);
        console.log("Getting cart items ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting cart items:', error);
        throw error;
    }
};


const updateCartItem = async (productId, quantity) => {
    const response = await axios.put(`/api/cart/update`, { productId, quantity });
    return response.data; // Let the caller handle the response
};

const removeFromCart = async (productId) => {
    try {
        const response = await axios.delete(`/api/cart/remove/${productId}`);
        console.log("Removing product with ID:", productId); // Ensure this logs the CartItem ID to be removed
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error; 
    }
};


const clearCart = async () => {
    try {
        const response = await axios.get(`/api/cart/clear`);
        console.log("Cart cleared");
        return response.data;
    } catch (error) {
        console.error('Error clearing the cart:', error);
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

