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
  const [notificationCount, setNotificationCount] = useState();
  const [userCalendars, setUserCalendars] = useState([]);
  const accepted = true;
  const [ notificationsData, setNotificationsData ] = useState([]);

  const [notifyID, setNotifyID] = useState(''); 



  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    loadUserCalendars(userUid);
    
  }, []);

  const loadUserCalendars = async (userUid) => {
    try {
      const firestore = firebase.firestore();
      const calendarsRef = firestore.collection('calendars');
      const userCalendarsSnapshot = await calendarsRef
        //.where('users', 'array-contains', userUid)// Checks if the user is a participant
        .where('creatorId', '==', userUid)
        .get();

        const notificationRef = firestore.collection('Notification-Data');
        const notificationSnapshot = await notificationRef
        .where("receiever", '==', userUid)
        .where('decision', '==', accepted)
        .get();
        const notificationsData = notificationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        processNotifications(notificationsData);
        console.log("NotificationData: ", notificationsData);
      const userCalendarsData = [];

      console.log("Adding where user is creator... ")
      // Using this to process calendars where the user is a participant
      userCalendarsSnapshot.forEach((doc) => {
        userCalendarsData.push({ id: doc.id, ...doc.data() });
        
      });

      console.log("Now adding Accepted requests...")

      notificationSnapshot.forEach((doc) => {
        userCalendarsData.push({ ...doc.data().calendarId });
      });


      setUserCalendars(userCalendarsData);
    //processNotifications(notificationSnapshot.docs);
    } catch (error) {
      console.error('Error loading user calendars:', error);
    }
  };

  const handleBellIconClick = async() =>{
    //Setting up the notification message and the display of the pop-up section
    try{
      const notificationsSnapshot = await firebase
      .firestore()
      .collection('Notification-Data')
      .where('receiver', '==', user.uid)
      .get();

      

      //After the user clicked the bell icon 
      setNotificationCount(0);

    setNotificationMessage('You have new notifications!');
    setShowNotification(true);

    }catch(error){
      console.error('Error loading notifications: ', error);
    }
  };
  

  const processNotifications = (notificationsData) =>{
    setNotificationCount(notificationsData.length);
    //notificationsData.forEach(async (notification) => {

      const inviteMessage  = `${notificationsData[0].sender} has sended an invitation for you to accept this certain meeting time and join "${notificationsData[0].calendarId}".`;

      setNotificationMessage(inviteMessage);

      setShowNotification(true);
      //const notificationId = notification.id;
      //const calendarId = notification.calendarId;

      //Render a Notification Popup for each notification
     // setNotifyID(notificationId);
      //setNotificationMessage(inviteMessage);
      //setShowNotification(true);
   // });
      

      //const accepted = true;
      //handleNotificationInteraction(notification.id);
    
  };

  // const handleNotificationInteraction = async (notificationId) =>{
  //   await firebase.firestore().collection('Notification-Data').doc(notificationId).update({
  //     decision:accepted,
  //   });
  //   // const accepted = true;
  //   if(accepted){
  //     const notificationdataDoc = await firebase.firestore().collection('Notification-Data').doc(notificationId).get();
  //   const calendarId = notificationdataDoc.data().calendarId;

  //   // Add the calendar to the user's list of calendars
  //   const updatedCalendars = [...userCalendars, { id: calendarId, calendarName: 'Loading...' }];
  //   setUserCalendars(updatedCalendars);

  //   // Navigate to the calendar view
  //   // window.location.href = `/ViewCalendar/${calendarId}`;
  //   }
  // };

  

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

