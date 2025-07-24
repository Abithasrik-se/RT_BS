import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }
    axios.get("http://localhost:8000/api/profile/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data))
    .catch(err => setError("Failed to fetch profile. Maybe token expired."));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h2>User Profile</h2>
      <img
        src={`http://localhost:8000${profile.image}`}
        alt="Profile"
        style={{ width: "100px", borderRadius: "50%" }}
      />
      <h3>{profile.first_name} {profile.last_name}</h3>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
};

export default Profile;


