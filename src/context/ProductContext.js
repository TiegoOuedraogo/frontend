
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../api/api'; 

// Create the context
const ProductContext = createContext();

// Create a custom hook to access the context
export const useProductContext = () => {
  return useContext(ProductContext);
};

// Create the ProductProvider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

