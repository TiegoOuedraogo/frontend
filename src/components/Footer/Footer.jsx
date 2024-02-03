import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.aboutCompany}>
                    <h3>About Us</h3>
                    <p>Information about the company...</p>
                    {/* Additional content */}
                </div>
                <div className={styles.quickLinks}>
                    <h3>Quick Links</h3>
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    {/* Additional links */}
                </div>
                <div className={styles.socialMedia}>
                    {/* Icons or links to social media */}
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>© 2024 SHC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
