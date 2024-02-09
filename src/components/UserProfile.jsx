// import React from 'react';
// import { useAuth } from '../context/AuthContext';

// function UserProfile() {
//   const { user, isAuthenticated, login, logout } = useAuth();

//   const handleLogin = () => {
    
//     const userData = { username: 'example', email: 'example@example.com' };
//     login(userData);
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <div>
//           <p>Welcome, {user.username}!</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <p>You are not logged in.</p>
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserProfile;

import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div>
            <h2>User Profile</h2>
            <img src={user.profileInfo.image} alt={user.profileInfo.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <p><strong>Name:</strong> {user.profileInfo.name}</p>
            <p><strong>Address:</strong> {user.profileInfo.address}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default UserProfile;
