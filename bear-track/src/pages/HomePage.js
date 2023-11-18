// HomePage.js
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import firebase from '../config/firebase';
import { Link } from 'react-router-dom';
import BellIcon from '../components/bell-filled.svg';
import 'firebase/compat/firestore';
import { useUser } from './UserContext';
import NotificationPopup from '../components/NotificationPopup';
import CustomCalendar from './CustomCalendar'; 

const HomePage = () => {
  const user = useUser();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [userCalendars, setUserCalendars] = useState([]);

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    loadUserCalendars(userUid);
  }, []);

  const loadUserCalendars = async (userUid) => {
    try {
      const firestore = firebase.firestore();
      const calendarsRef = firestore.collection('calendars');
      const userCalendarsSnapshot = await calendarsRef
        .where('users', 'array-contains', userUid) // Checks if the user is a participant
        .get();

      const userCalendarsData = [];

      // Using this to process calendars where the user is a participant
      userCalendarsSnapshot.forEach((doc) => {
        userCalendarsData.push({ id: doc.id, ...doc.data() });
      });

      setUserCalendars(userCalendarsData);
    } catch (error) {
      console.error('Error loading user calendars:', error);
    }
  };

  const handleBellIconClick = () =>{
    //Setting up the notification message and the display of the pop-up section
    setNotificationMessage('You have new notifications!');
    setShowNotification(true);
  };

  return (
    <div className="homepage">
      <div className='bell'><img src = {BellIcon} onClick={handleBellIconClick}/>
      {notificationCount > 0 && (
        <div className='notification-count'>{notificationCount}</div>
      )}
      </div>
      {showNotification && (
        <NotificationPopup 
        message = {notificationMessage}
        onClose={() => setShowNotification(false)}
        />
      )}
      <h1>My Calendar</h1>
  
      <div className="left-panel"></div>
      <div className="logo-photo">
        <img src="./logo.png" alt="Grizzly Bear face" />
        <div className="titleStyle">DateWise</div>
      </div>
      <Link to="/MyProfile">
        <div>
          <img alt="User profile" src={user.image} className="user-photo" />
        </div>
      </Link>

      <div className="profileName">{user.userName}</div>

      <Link to="/">
        <button className="logout-button">Logout</button>
      </Link>

      <div className="center-panel">
        <CustomCalendar />
      </div>

      <div className="right-panel">
        <div className="calendarName">Mutual Calendar</div>

        <div className="user-calendars" style={{ overflowY: 'scroll', height: '150px' }}>
          {userCalendars.map((calendar) => (
            <Link key={calendar.id} to={`/ViewCalendar/${calendar.id}`} className="calendar-link">
              <button className="mutual-calendar-button">{calendar.calendarName}</button>
            </Link>
          ))}
        </div>

        <Link to="/NewCalendar">
          <button className="new-calendar-button">New Calendar</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

