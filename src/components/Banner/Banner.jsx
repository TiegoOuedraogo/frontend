import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Banner.module.css';
import { fetchProducts } from '../../api/api'; 

const Banner = () => {
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        const fetchAndSetRandomProducts = async () => {
            try {
                const products = await fetchProducts();
                const randomSelection = getRandomProducts(products, 4);
                setRandomProducts(randomSelection);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchAndSetRandomProducts();
    }, []);

    const getRandomProducts = (products, num) => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    return (
        <div className={styles.banner}>
            <div className={styles.bannerContent}>
                <h1>Welcome to Our Shop</h1>
                <p>Get the best products for your needs</p>
                <Link to="/products" className={styles.shopButton}>Browse Our Shop</Link>

                <div className={styles.limitedTimeOffer}>
                    <span>🔥 10% Off! Limited Time Offer</span>
                </div>

                <div className={styles.lastCallOffer}>
                    <span>Last Call! Buy 2 Get One Free 🎉</span>
                </div>

                <div className={styles.newSignupOffer}>
                    <span>🌟 Special Offer for New Sign-ups: Buy 2 Get One Free!</span>
                    <Link to="/register" className={styles.signupButton}>Sign Up Now</Link>
                </div>
            </div>
            <div className={styles.promotionArea}>
                <div className={styles.featuredProducts}>
                    {randomProducts.map((product) => (
                        <div className={styles.product} key={product.id}>
                        <img className={styles.productImage} src={product.images[0]} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;

