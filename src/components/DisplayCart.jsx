import React, { useContext } from 'react';
import styles from './DisplayCart.module.css';
import { CartContext } from '../context/CartContext';

const DisplayCart = ({ onCheckout }) => {
  const { cart: cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className={styles.DisplayCart}>
      <div className={styles.cartItems}>
        {cartItems.map(item => (
          <div className={styles.cartItem} key={item.id}>
            <img className={styles.productImage} src={item.image} alt={item.name} />
            <div className={styles.productInfo}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.checkoutSection}>
        <button onClick={onCheckout} className={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default DisplayCart;

