// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import styles from './Header.module.css';
// import logo from './logo/E-Logo.png';
// import { useAuth } from '../../context/AuthContext'; 

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const { isAuth, userRole } = useAuth(); 

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };
    
//     return (
//         <header className={styles.header}>
//             <div className={styles.logo}>
//                 <img src={logo} alt="SHC Logo" className={styles.logoImage} />
//             </div>
//             <div className={styles.navContainer}>
//                 <nav>
//                     <ul className={styles.navLinks}>
//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="/products">Products</Link></li>
//                         <li><Link to="/services">Services</Link></li>
//                         <li><Link to="/contact">Contact</Link></li>
//                         <li><Link to="/cart">Cart</Link></li>
//                     </ul>
//                 </nav>
//                 <div className={styles.searchBar}>
//                     <form>
//                         <input type="text" placeholder="Search..." />
//                         <button type="submit">Search</button>
//                     </form>
//                 </div>
//                     <div className={styles.accountMenu}>
//                     <button className={styles.btn} onClick={toggleMenu}>Account</button>
//                     {isOpen && (
//                         <div className={styles.dropdownOptions}>
//                             {!isAuth && <a href="register">Register</a>}
//                             {!isAuth && <a href="login">Login</a>}
//                             {isAuth && <a href="/">Logout</a>}
//                             {isAuth && userRole === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
//                         </div>
//                     )}
//                     </div>
//             </div>
//         </header>
//     );
// };

// export default Header;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from './logo/E-Logo.png';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuth, userRole, logout } = useAuth(); // Assuming logout is provided by useAuth

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout(); // Clears user session and updates isAuth state
        setIsOpen(false); // Optionally close the account menu
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
                            {!isAuth && <>
                                <Link to="/register">Register</Link>
                                <Link to="/login">Login</Link>
                            </>}
                            {isAuth && <>
                                <button onClick={handleLogout}>Logout</button>
                                {userRole === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
                            </>}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
