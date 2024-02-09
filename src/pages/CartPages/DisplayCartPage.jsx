import React, { useContext} from 'react';
import styles from './DisplayCartPage.module.css';
import { CartContext } from '../../context/CartContext';

const DisplayCartPage = ({ onCheckout }) => {
  const { cart, error, updateCartItem,removeFromCart } = useContext(CartContext);

  const handleQuantityChange = async (productId, newQuantity) => {
    await updateCartItem(productId, parseInt(newQuantity, 10));
  };

  if (!cart.cartItems || cart.cartItems.length === 0) {
    return <div className={styles.emptyCart}>Your cart is empty.</div>;
  }

  return (
    <div className={styles.DisplayCart}>
      <h1>Shopping Cart</h1>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.cartItems}>
        {cart.cartItems.map((item) => (
          <div className={styles.cartItem} key={item._id}>
            <div className={styles.itemDetails}>
              <img className={styles.productImage} src={item.image} alt={item.name} />
              <div className={styles.productInfo}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className={styles.quantityControl}>
                  <label htmlFor={`quantity-${item._id}`}>Qty:</label>
                  <select
                    id={`quantity-${item._id}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  >
                    {[...Array(10).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.itemPrice}>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item._id)} className={styles.removeButton} aria-label="Remove item">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.totalSection}>
        <p className={styles.subtotal}>
          Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):
          <span>${cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
        </p>
        <button onClick={onCheckout} className={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default DisplayCartPage;

