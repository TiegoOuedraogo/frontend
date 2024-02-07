import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  if (!item || typeof item !== 'object') {
    console.error('Invalid item structure:', item);
    return null; 
  }

  // Destructure properties from item
  const { _id, name, description, price, quantity, images } = item;

  return (
    <div>
      {images && images.length > 0 && (
        <img src={images[0]} alt={name} />
      )}
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{`Price: ${price}`}</p>
      <p>{`Quantity: ${quantity}`}</p>
      <div>
        <button onClick={() => decrementQuantity(_id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => incrementQuantity(_id)}>+</button>
        <button onClick={() => removeFromCart(_id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
