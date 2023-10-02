import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import firebase from '../firebase.js'

// To allow a user to Log into an existing account.
// It does not sign you in if you do not have an account

  const Login = () => {
    
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
    
      const handleSignIn = async () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
            
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
      };
      
    return (
      <div className="login-container">
        <div className="login-left">

         {/* Insert your image here */}
        <img src="/BearLogo.png" alt="Your Image" />

          <h2>Login</h2>
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button onClick={handleSignIn}>Login</button>
          </form>
        </div>
        <div className="login-right">
          {/* Background image will be displayed here */}
        </div>
      </div>
    );
}

export default Login;
