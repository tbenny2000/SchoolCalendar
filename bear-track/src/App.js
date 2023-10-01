import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import './App.css'; // Import the CSS file for styling
// import Signup from './components/SignUp';

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
