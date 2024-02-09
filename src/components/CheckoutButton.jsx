import React from 'react';
import { useAuth } from '../context/AuthContext';
import { checkoutOrder } from '../api/checkOutOrderApi'

const CheckoutButton = () => {
    const { token } = useAuth(); // Extract token using useAuth

    const handleCheckout = async () => {
        try {
            // Example data, replace with actual data collected from user
            const shippingAddress = {/* Your shipping address object */};
            const paymentMethod = 'CreditCard';

            // Pass the token as an argument
            const result = await checkoutOrder(shippingAddress, paymentMethod, token);
            console.log(result);
            // Handle success (e.g., redirect to a success page)
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Checkout process failed:', error);
        }
    };

    return <button onClick={handleCheckout}>Proceed to Checkout</button>;
};

export default CheckoutButton;

