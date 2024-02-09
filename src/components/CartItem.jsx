// import React, { useContext } from 'react';
// import { CartContext } from '../context/CartContext';

// const CartItem = ({ item }) => {
//   const { removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

//   if (!item || typeof item !== 'object') {
//     console.error('Invalid item structure:', item);
//     return <p>Item is not available.</p>;
//   }
  
//   const { _id, name, description, price, quantity, images } = item;

//   return (
//     <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
//       {images && images.length > 0 && (
//         <img src={images[0]} alt={name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//       )}
//       <h3>{name}</h3>
//       <p>{description}</p>
//       <p>{`Price: $${price.toFixed(2)}`}</p>
//       <p>{`Quantity: ${quantity}`}</p>
//       <div>
//         <button aria-label="Decrease quantity" onClick={() => decrementQuantity(_id)}>-</button>
//         <span style={{ margin: '0 10px' }}>{quantity}</span>
//         <button aria-label="Increase quantity" onClick={() => incrementQuantity(_id)}>+</button>
//         <button aria-label="Remove item from cart" onClick={() => removeFromCart(_id)}>Remove</button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;



import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, incrementQuantity, decrementQuantity, updateQuantity } = useContext(CartContext);
  const [editQuantity, setEditQuantity] = useState(item.quantity); 

  if (!item || typeof item !== 'object') {
    console.error('Invalid item structure:', item);
    return <p>Item is not available.</p>;
  }

  const { _id, name, description, price, quantity, images } = item;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setEditQuantity(newQuantity); // Update local state
  };

  const handleSubmitQuantity = () => {
    updateQuantity(_id, editQuantity); // Update quantity in cart context
  };

  // Optional: Reset local edit quantity if the global quantity changes
  React.useEffect(() => {
    setEditQuantity(quantity);
  }, [quantity]);

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
      {images && images.length > 0 && (
        <img src={images[0]} alt={name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
      )}
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{`Price: $${price.toFixed(2)}`}</p>
      <p>Quantity:</p>
      <div>
        <button aria-label="Decrease quantity" onClick={() => decrementQuantity(_id)}>-</button>
        <input
          type="number"
          value={editQuantity}
          onChange={handleQuantityChange}
          onBlur={handleSubmitQuantity} // Update quantity when input loses focus
          onKeyPress={(e) => e.key === 'Enter' && handleSubmitQuantity()} // Allow submitting with the Enter key
          min="1"
          style={{ width: '50px', marginLeft: '10px', marginRight: '10px' }}
        />
        <button aria-label="Increase quantity" onClick={() => incrementQuantity(_id)}>+</button>
      </div>
      <button aria-label="Remove item from cart" onClick={() => removeFromCart(_id)}>Remove</button>
    </div>
  );
};

export default CartItem;
