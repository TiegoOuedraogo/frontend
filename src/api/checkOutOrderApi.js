 const CheckoutOrder = async (shippingAddress, paymentMethod, token) => {
    try {
        const response = await fetch('/api/orders/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Use the token passed as a parameter for the Authorization header
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ shippingAddress, paymentMethod }),
        });

        if (!response.ok) {
            // Throw an error with the response status to handle it in the catch block
            throw new Error(`Checkout failed with status: ${response.status}`);
        }

        const result = await response.json();
        // Consider using a more sophisticated method for user feedback in production code
        console.log('Checkout successful:', result);

        return result; // Returning the result for further processing (e.g., redirecting)
    } catch (error) {
        console.error('Checkout error:', error);
        // Consider propagating the error or handling it more gracefully
        throw error; // Throwing the error for the caller to handle
    }
};

export default CheckoutOrder;

