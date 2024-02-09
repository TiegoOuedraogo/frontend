import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import DisplayCartPage from './pages/CartPages/DisplayCartPage';
import ProductPage from './pages/ProductPages/ProductPage';
import CheckoutPage from './pages/CheckOutPage/CheckOutPage';
import ContactPage from './components/Header/Contact';
import ServicesPage from './components/Header/Services';

import AdminDashboard from './AdminDashboard/AdminDashboard';
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
                <Route path="products" element={<ProductPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="cart" element={<DisplayCartPage />} /> 
                <Route path="checkout" element={<CheckoutPage />} />

                <Route path="admin" element={<AdminDashboard />} /> 

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

