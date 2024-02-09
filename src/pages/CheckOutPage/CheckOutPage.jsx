import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CheckoutOrder from '../../api/checkOutOrderApi';
import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
    const { token } = useAuth(); // Retrieve the auth token from the context
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    }); // Expanded for a more detailed address
    const [paymentMethod, setPaymentMethod] = useState('CreditCard');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Pass the token along with other details to the checkout API call
            await CheckoutOrder(shippingAddress, paymentMethod, token);
            alert('Checkout successful!');
            // Redirect to a success page or update the UI accordingly
        } catch (error) {
            alert('Checkout failed. Please try again.');
            console.error('Checkout error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    placeholder="1234 Main St"
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="address">City</label>
                <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                />

                <div className={styles.inputGroup}>
                    <label htmlFor="address">Zip Code</label>

                </div>
                <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    placeholder="Postal Code"
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="address">ountry</label>
                <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                >
                    <option value="CreditCard">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash">Cash on Delivery</option>
                </select>
            </div>

            <button type="submit" className={styles.submitButton}>Complete Checkout</button>
        </form>
    );
};

export default CheckoutPage;
