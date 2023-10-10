import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import firebase from '../firebase'; // Import your firebase.js file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setSuccessMessage('Sign-in successful!'); // Set a success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        {/* Insert your image here */}
        <img src="/BearLogo.png" alt="Your Image" />
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="button" onClick={handleSignIn}>Login</button>
        </form>
      </div>
      <div className="login-right">
        {/* Background image will be displayed here */}
      </div>
    </div>
  );
};

export default Login;
