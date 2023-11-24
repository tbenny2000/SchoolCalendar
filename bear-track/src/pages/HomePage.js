import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import your CSS file for styling
import firebase from '../config/firebase'; // Import your firebase.js file
import { Link } from 'react-router-dom';
import BellIcon from '../components/bell-filled.svg';
import 'firebase/compat/firestore';
import { useUser } from './UserContext';


const HomePage = () => {
  const user = useUser();
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

  if (user.imageURL == null){
    user.image = './Screenshot 2023-09-15 at 1.46 1.png';
    console.log("Printing from image addition")
  } else{
    user.image = user.imageURL;
    console.log("Printing from successful image addition: ",)
  }
 
  console.log(firebase.auth().currentUser.uid)
 
  return (
    <div className="homepage">
      <div className='bell'><img src = {BellIcon}/>
      </div>
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

      <div className="center-panel">
      
      </div>

      <div className = "right-panel">
        <div className = "calendarName">Mutual Calendars</div>
        
        <div className="user-calendars">
        {userCalendars.map((calendar) => (
          <Link
            key={calendar.id}
            to={`/ViewCalendar/${calendar.id}/${encodeURIComponent(calendar.calendarName)}`} // Pass calendarName as well
            className="calendar-link"
          >
            <button className="mutual-calendar-button">{calendar.calendarName}</button>
          </Link>
        ))}
        </div>
        
        <Link to = "/NewCalendar">
        <button className='new-calendar-button'>New Calendar</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
