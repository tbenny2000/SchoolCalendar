import React from 'react';
import './HomePage.css'; // Import your CSS file for styling
import firebase from '../config/firebase'; // Import your firebase.js file
import { Link } from 'react-router-dom';
import BellIcon from '../components/bell-filled.svg';
import 'firebase/compat/firestore';
import { useUser } from './UserContext';
import NotificationPopup from '../components/NotificationPopup';
import { useState } from 'react';


const HomePage = () => {

  const user = useUser();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);

  if (user.imageURL == null){
    user.image = './Screenshot 2023-09-15 at 1.46 1.png';
    console.log("Printing from image addition")
  } else{
    user.image = user.imageURL;
    console.log("Printing from successful image addition: ",)
  }
 
  console.log(firebase.auth().currentUser.uid)

  const handleBellIconClick = () =>{
    //Setting up the notification message and the display of the pop-up section
    setNotificationMessage('You have new notifications!');
    setShowNotification(true);
  };
 
  return (
    <div className="homepage">
      <div className='bell'><img src = {BellIcon} onClick = {handleBellIconClick}/>
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
      <div className = "left-panel">
      </div>
      <div className='logo-photo'>
            <img src = "./logo.png" alt="Grizzly Bear face"/>
            <div className='titleStyle'>DateWise</div>
      </div>
      <Link to = "/MyProfile">
          <div>
            <img alt = "User profile" src = {user.image} className='user-photo'/>
      </div>
          </Link>

        <div className='profileName' >{user.userName}</div>

          
      
        <Link to="/">
        <button className="logout-button">Logout</button>

        </Link>
      <div className = "right-panel">
        <div className = "calendarName">Mutual Calendar</div>
        <div style = {{ overflowY: 'scroll', height: '150px'}}>
        <Link to = "/ViewCalendar">
        Team meeting
        </Link>
        </div>
        
        <Link to = "/NewCalendar">
        <button className='new-calendar-button'>New Calendar</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
