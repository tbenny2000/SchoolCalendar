import React from 'react';
import './HomePage.css'; // Import your CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage">

      <div className="right-panel">
      <div className="user-info">
          <h1>Welcome Mr. Bean!</h1>
          <p>Your Username</p>
          <div className="user-photo">
            {/* Placeholder for user photo */}
      </div>

      <div className="center-panel">
        <h2>React Calendar</h2>
        {/* Placeholder for a React calendar */}
      </div>

      <div className="left-panel">

      <h2>Custom Calendars</h2>
        {/* Add content for custom calendars here */}
        
          </div>

        </div>
        <button className="logout-button">Logout</button>

      </div>
    </div>
  );
};

export default HomePage;
