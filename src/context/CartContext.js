import React, { createContext, useState, useEffect } from 'react';
import cartApi from '../api/cartApi';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ cartItems: [], total: 0 });
    const [error, setError] = useState('');

    useEffect(() => {
        // Initial fetch for cart items
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await cartApi.getCartItems();
            setCart(response);
        } catch (error) {
            setError('Failed to fetch cart items');
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            await cartApi.updateCartItem(productId, quantity);
            // Re-fetch cart items to reflect the update
            fetchCartItems();
        } catch (error) {
            setError('Failed to update cart item',error);
        }
    };


    const removeFromCart = async (productId) => {
        try {
            const updatedCart = await cartApi.removeFromCart(productId);
            if (updatedCart) setCart(updatedCart);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };
    

    const updateQuantity = (productId, increment = true) => {
        const cartItem = cart.cartItems.find(item => item._id === productId);
        if (cartItem) {
            const newQuantity = increment ? cartItem.quantity + 1 : Math.max(cartItem.quantity - 1, 0);
            updateCartItem(productId, newQuantity);
        }
    };


    const clearCart = async () => {
        try {
            await cartApi.clearCart();
            setCart({ cartItems: [], total: 0 }); // Reset cart state
        } catch (error) {
            console.error('Error clearing the cart:', error);
        }
    };


    const incrementQuantity = productId => updateQuantity(productId, true);
    const decrementQuantity = productId => updateQuantity(productId, false);

    return (
        <CartContext.Provider value={{ cart,error, removeFromCart, incrementQuantity, decrementQuantity, clearCart,updateQuantity,updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};


