import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  return (
    <div>
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => decrementQuantity(item.id)}>-</button>
      <button onClick={() => incrementQuantity(item.id)}>+</button>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
};

export default CartItem;

