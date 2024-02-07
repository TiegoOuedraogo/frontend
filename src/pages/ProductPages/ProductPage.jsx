import styles from './ProductDisplay.module.css';
import cartApi from '../../api/cartApi'; 
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../api/api'; 

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = async (product) => {
        try {
            await cartApi.addToCart({ productId: product._id, quantity: 1 });
            console.log('Item added to cart successfully', product);
            // Optionally: Update the state to reflect the item addition
        } catch (error) {
            console.error('Error adding to cart:', error);
            // Handle error (e.g., show message to user)
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.productDisplay}>
            <div><h1 className={styles.header}>Products list</h1></div>
            <div className={styles.productsGrid}>
                {products.map(product => (
                    <div className={styles.productCard} key={product._id}>
                        <img className={styles.productImage} src={product.images[0]} alt={product.name} />
                        <div className={styles.productInfo}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <button className={styles.addButton} onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;


