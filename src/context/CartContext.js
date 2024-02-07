import cartApi from '../api/cartApi'; 

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children, userId }) => {
    console.log("in cart context user id ", userId)
    const [cart, setCart] = useState([]);
    console.log('cart in useContext cart contains', cart)

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await cartApi.getCartItems(userId);
                console.log("Fetched cart items:", response);
                if (response && response.cartItems) {
                    setCart(response);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
    
        fetchCartItems();
    }, [userId]);
    

    const removeFromCart = async (productId) => {
        console.log('In cart Context testing to remove product with ID:', productId);
        try {
            await cartApi.removeFromCart(productId);
            setCart(prevCart => ({
                ...prevCart,
                cartItems: prevCart.cartItems.filter(item => item._id !== productId)
            }));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };
    
    const incrementQuantity = async (productId) => {
        const cartItem = cart.cartItems.find(item => item._id === productId);
        if (cartItem) {
            const newQuantity = cartItem.quantity + 1;
            try {
                const updatedItem = await cartApi.updateCartItem(productId, newQuantity);
                // Assume the API returns the updated cart
                setCart(updatedItem);
            } catch (error) {
                console.error('Error updating cart quantity:', error);
            }
        }
    };
    
    const decrementQuantity = async (productId) => {
        const cartItem = cart.cartItems.find(item => item._id === productId);
        if (cartItem && cartItem.quantity > 1) {
            const newQuantity = cartItem.quantity - 1;
            try {
                const updatedItem = await cartApi.updateCartItem(productId, newQuantity);
                // Assume the API returns the updated cart
                setCart(updatedItem);
            } catch (error) {
                console.error('Error updating cart quantity:', error);
            }
        } else if (cartItem && cartItem.quantity === 1) {
            removeFromCart(productId);
        }
    };
    
    const clearCart = async () => {
        try {
            const response = await cartApi.clearCart();
            // Assume the API clears the cart and returns an empty cart or success message
            setCart(response);
        } catch (error) {
            console.error('Error clearing the cart:', error);
        }
    };
    return (
        <CartContext.Provider value={{ cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


