import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import styles from './UserProfile.module.css'; 

const UserProfile = () => {
    const { token } = useAuth(); // Use the token from AuthContext
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!token) {
                setError("User is not authenticated.");
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setUserProfile(response.data);
            } catch (err) {
                setError('Failed to fetch user profile.');
                console.error(err);
            }
        };

        fetchUserProfile();
    }, [token]); 

    if (!userProfile) return <div>{error || "Loading..."}</div>;

    return (
        <div className={styles.profileContainer}>
            <h2>User Profile</h2>
            <img src={userProfile.profileInfo.image} alt={userProfile.profileInfo.name} className={styles.profileImage} />
            <p><strong>Name:</strong> {userProfile.profileInfo.name}</p>
            <p><strong>Address:</strong> {userProfile.profileInfo.address}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Username:</strong> {userProfile.username}</p>
            <p><strong>Role:</strong> {userProfile.role}</p>
        </div>
    );
};

export default UserProfile;
