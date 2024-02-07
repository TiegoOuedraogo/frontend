// AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/admin/products" className={styles.navLink}>Product Management</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/admin/users" className={styles.navLink}>User Management</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/admin/orders" className={styles.navLink}>Order Management</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/admin/categories" className={styles.navLink}>Category Management</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
