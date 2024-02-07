// import React, { useContext } from 'react';
// import styles from './DisplayCartPage.module.css';
// import { CartContext } from '../../context/CartContext';

// const DisplayCartPage = ({ onCheckout }) => {
//   const { cart, removeFromCart } = useContext(CartContext); 
//   const cartItems = cart.cartItems;

//   console.log("cart page items are: ", cartItems);

//   if (!cartItems || cartItems.length === 0) {
//     return <div>Your cart is empty or still loading...</div>;
//   }
//   // {cartItems.map((item, index) => {
//   //   console.log('Current item in the map:', item);

//    return (
//     <div className={styles.DisplayCart}>
//       <h1>Hello World</h1>
//       <div className={styles.cartItems}>
//       {cartItems.map((item) => (
//   <div className={styles.cartItem} key={item.id}>
//     <img className={styles.productImage} src={item.image} alt={item.name} />
//     <div className={styles.productInfo}>
//       <h3>{item.name}</h3>
//       <p>{item.description}</p>
//       <p>Quantity: {item.quantity}</p>
//       <button onClick={() => removeFromCart(item._id)} className={styles.removeButton}>Remove</button>
//     </div>
//   </div>
// ))}

//       </div>
//       <div className={styles.checkoutSection}>
//         <button onClick={onCheckout} className={styles.checkoutButton}>Proceed to Checkout</button>
//       </div>
//     </div>
//   );
//   }
// //   )};
// // };


// export default DisplayCartPage;


import React, { useContext, useState, useEffect, useMemo } from 'react';
import { CartContext } from '../../context/CartContext';
import FormatCurrency from '../../utils/FormatCurrency';
import styles from './DisplayCartPage.module.css';

const DisplayCartPage = ({ onCheckout }) => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  // Memoize cartItems to only recalculate when cart.cartItems changes
  const cartItems = useMemo(() => cart.cartItems || [], [cart.cartItems]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Calculate total cost whenever cartItems changes
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotalCost(total);
  }, [cartItems]);

  if (!cartItems.length) {
    return <div className={styles.DisplayCart}><div>Your cart is empty or still loading...</div></div>;
  }

  return (
    <div className={styles.DisplayCart}>
      <h1>Shopping Cart</h1>
      <table className={styles.basket}>
        <thead>
          <tr>
            <th className="col">Item</th>
            <th className="col">Unit Cost</th>
            <th className="col">Total Cost</th>
            <th className="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            if (!item || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
              console.error('Invalid item structure:', item);
              return null;
            }
            return (
              <tr key={item._id} data-testid={`item-${item._id}`}>
                <td className="col">
                  {item.quantity} {item.name}
                </td>
                <td className="col" data-testid={`item-unit-cost-${item._id}`}>
                  {FormatCurrency(item.price, 'USD')}
                </td>
                <td className="col" data-testid={`item-total-cost-${item._id}`}>
                  {FormatCurrency(item.price * item.quantity, 'USD')}
                </td>
                <td className="col last">
                  <button className="action decrementButton" data-testid={`decrement-button-${item._id}`} aria-label="decrement 1 item" onClick={() => decrementQuantity(item._id)}>
                    -
                  </button>
                  <span className="action quantity" data-testid={`item-quantity-${item._id}`}>
                    {item.quantity}
                  </span>
                  <button className="action incrementButton" data-testid={`increment-button-${item._id}`} aria-label="increment 1 item" onClick={() => incrementQuantity(item._id)}>
                    +
                  </button>
                  <button className="action removeButton" data-testid={`remove-button-${item._id}`} aria-label="remove item" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
          <tr className="summary">
            <td id="totalLabel" colSpan={3} align="right">
              Total to pay:
            </td>
            <td id="total" data-testid={`total-amount`}>
              <b>{FormatCurrency(totalCost, 'USD')}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayCartPage;

