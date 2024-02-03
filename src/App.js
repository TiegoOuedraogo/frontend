import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register';
import ProductDisplay from './components/ProductDisplay';
import DisplayCart from './components/DisplayCart';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext'; 
import { CartProvider } from './context/CartContext';

import './App.css'

const App = () => {

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider> 
        <Router>
          <div className="App">
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="products" element={<ProductDisplay />} />
                <Route path="cart" element={<DisplayCart />} /> 
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};


export default App;

