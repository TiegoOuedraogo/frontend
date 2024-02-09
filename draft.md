// const updateCartItem = async (productId, quantity) => {
//     try {
//         const response = await axios.put(`/api/cart/update`, { productId, quantity });
//         console.log("At cart api", response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating cart item:', error);
//         throw error;
//     }
// };


// const updateCartItem = async (productId, quantity, setCart, setError) => {
//     try {
//         const response = await axios.put(`/api/cart/update`, { productId, quantity });
//         console.log("At cart api", response.data);
//         // Assuming the response includes the updated cart, use setCart to update the state
//         setCart(response.data);
//     } catch (error) {
//         console.error('Error updating cart item:', error);
//         // Set error message state to show to the user
//         setError(error.response?.data?.message || 'An error occurred while updating the cart.');
//     }
// };

