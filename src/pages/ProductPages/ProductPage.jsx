import styles from './ProductDisplay.module.css';
import cartApi from '../../api/cartApi';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../api/api';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts();
                console.log("produts ", data)
                setProducts(data);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = async (product) => {
        try {
            await cartApi.addToCart({ productId: product._id, quantity: 1 });
            alert(`Added "${product.name}" to cart successfully.`);
        } catch (err) {
            console.error('Error adding to cart:', err);
            alert('Error adding to cart. Please try again.');
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.productDisplay}>
            <h1 className={styles.header}>Products List</h1>
            <div className={styles.productsGrid}>
                {products.map(product => (
                    <div className={styles.productCard} key={product._id}>
                        <img className={styles.productImage} src={product.images[0]} alt={product.name} />
                        <div className={styles.productInfo}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <button className={styles.addButton} onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;

