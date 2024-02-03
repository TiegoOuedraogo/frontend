import React, { createContext, useState } from 'react';
import cartApi from '../api/cartApi'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    try {
        const response = await cartApi.addToCart({
            productId: product._id, // Changed from product.id to product._id
            quantity: 1
        });
        setCart(response.cart); // Make sure the response structure is correct
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

const removeFromCart = async (productId) => {
    try {
        await cartApi.removeFromCart(productId);
        setCart(cart.filter(item => item.id !== productId));
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};

  const incrementQuantity = async (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        const newQuantity = cartItem.quantity + 1;
        try {
            await cartApi.updateCartItem(productId, newQuantity);
            setCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    }
};

const decrementQuantity = async (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        const newQuantity = cartItem.quantity - 1;
        try {
            await cartApi.updateCartItem(productId, newQuantity);
            setCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    } else if (cartItem && cartItem.quantity === 1) {
        removeFromCart(productId);
    }
};

const clearCart = async () => {
    try {
        await cartApi.clearCart();
        setCart([]);
    } catch (error) {
        console.error('Error clearing the cart:', error);
    }
};

return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}>
        {children}
    </CartContext.Provider>
);
};



