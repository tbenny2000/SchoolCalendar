import React from 'react';
import './Header.js'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <img src="/GGCLOGO1.png" alt="GGC Logo" className="header-logo" />
      <nav className="header-nav">
        {/* Add navigation links or menu items here */}
      </nav>
    </header>
  );
};

export default Header;
