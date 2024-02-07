// ProductManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductManagement.module.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Optionally handle the error
            }
        };

        fetchProducts();
    }, []);

    // Additional functions for handling product additions, edits, deletions, etc. can be added here

    return (
        <div className={styles.container}>
            <h1>Product Management</h1>
            {/* Layout for managing products (e.g., table, list, cards, etc.) */}
        </div>
    );
};

export default ProductManagement;
