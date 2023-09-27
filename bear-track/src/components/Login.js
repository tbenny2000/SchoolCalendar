import React from 'react';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Login</button>
        </form>
      </div>
      <div className="login-right">
        {/* Background image will be displayed here */}
      </div>
    </div>
  );
};

export default Login;
