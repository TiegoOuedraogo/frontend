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

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    const newCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(newCart);
  };

  const decrementQuantity = (productId) => {
    const newCart = cart.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(newCart);
  };
  
  const placeOrder = () => {
    alert('Order placed successfully!');
    setCart([]); 
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};


