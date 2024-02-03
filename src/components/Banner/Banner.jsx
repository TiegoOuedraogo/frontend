import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Banner.module.css';
//importing images
import promotionImage from '../../assets/images/Orange.jpeg';
import product1Image from '../../assets/images/Orange1.jpeg';
import product2Image from '../../assets/images/Orange1.jpeg';



const Banner = () => {
  return (
      <div className={styles.banner}>
          <div className={styles.bannerContent}>
              <h1>Welcome to Our Shop</h1>
              <p>Get the best products for your needs</p>
              <Link to="/products" className={styles.shopButton}>Browse Our Shop</Link>
          </div>
          <div className={styles.promotionArea}>
              {/* Use the imported image for the promotional area */}
              <img src={promotionImage} alt="Promotion" className={styles.promotionImage}/>
              {/* Feature a few products */}
              <div className={styles.featuredProducts}>
                  <div className={styles.product}>
                      {/* Use the imported image for product 1 */}
                      <img src={product1Image} alt="Product 1" />
                      <h3>Product 1</h3>
                      <p>Description of Product 1</p>
                  </div>
                  <div className={styles.product}>
                      {/* Use the imported image for product 2 */}
                      <img src={product2Image} alt="Product 2" />
                      <h3>Product 2</h3>
                      <p>Description of Product 2</p>
                  </div>
                  {/* ... add more products as needed ... */}
              </div>
          </div>
      </div>
  );
};

export default Banner;
