import React from 'react'; 
import { useProductContext } from '../context/ProductContext';
import styles from './ProductDisplay.module.css';
import cartApi from '../api/cartApi'; 

function ProductDisplay() {
  const { products, loading, error } = useProductContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddToCart = async (product) => {
    try {
      await cartApi.addToCart({ productId: product._id, quantity: 1 });
      console.log('Item added to cart successfully', product);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Error: Unauthorized - Token might be missing or invalid');
      } else {
        console.error('Error adding to cart:', error);
      }
    }
  };
  
  return (
    <div className={styles.productDisplay}>
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
}

export default ProductDisplay;

