// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';
// import styles from './Register.module.css';

// function Register() {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({
//       ...credentials,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/users/register', credentials);
//       console.log(response.data);
//       navigate('/login');
//     } catch (error) {
//       console.error('Registration failed:', error);
//       setError(error.response.data.message || 'Registration failed');
//     }
//   };
  
//   return (
//     <div className={styles.registerContainer}>
//       <h2>Register</h2>
//       {error && <div className={styles.error}>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="username" className={styles.label}>Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             className={styles.input}
//             value={credentials.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email" className={styles.label}>Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className={styles.input}
//             value={credentials.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="password" className={styles.label}>Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className={styles.input}
//             value={credentials.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit" className={styles.button}>Register</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;



// Import necessary hooks and styles
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css'; // Ensure your CSS module is set up correctly

function Register() {
  const navigate = useNavigate();

  // Extended credentials state to include profile information
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    profileInfo: {
      name: '',
      address: '',
      // Add other profile fields as necessary
    }
  });
  
  const [error, setError] = useState(null);

  // Adjusted handleChange to handle nested state for profileInfo
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setCredentials({
        ...credentials,
        [keys[0]]: {
          ...credentials[keys[0]],
          [keys[1]]: value
        }
      });
    } else {
      setCredentials({
        ...credentials,
        [name]: value
      });
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post('http://localhost:3000/api/users/register', credentials);
      console.log('Registration successful:', response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response.data.message || 'Registration failed. Please try again.');
    }
  };

  // Registration form
  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
      
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input type="text" id="username" name="username" className={styles.input} value={credentials.username} onChange={handleChange} required />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" name="email" className={styles.input} value={credentials.email} onChange={handleChange} required />
        </div>
       
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" name="password" className={styles.input} value={credentials.password} onChange={handleChange} required />
        </div>
      
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input type="text" id="name" name="profileInfo.name" className={styles.input} value={credentials.profileInfo.name} onChange={handleChange} required />
        </div>
      
        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>Address</label>
          <input type="text" id="address" name="profileInfo.address" className={styles.input} value={credentials.profileInfo.address} onChange={handleChange} />
        </div>
      
        <div>
          <button type="submit" className={styles.button}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
