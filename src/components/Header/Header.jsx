import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Header.module.css';
import logo from './logo/E-Logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="SHC Logo" className={styles.logoImage} />
            </div>
            <div className={styles.navContainer}>
                <nav>
                    <ul className={styles.navLinks}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </nav>
                <div className={styles.searchBar}>
                    <form>
                        <input type="text" placeholder="Search..." />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className={styles.accountMenu}>
                    <button className={styles.btn} onClick={toggleMenu}>Account</button>
                    {isOpen && (
                        <div className={styles.dropdownOptions}>
                            <a href="register">Register</a>
                            <a href="login">Login</a>
                            <a href="/">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
