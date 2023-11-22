import React, { useState } from "react";
import './NotificationPopup.css';
import { useNavigate } from "react-router-dom";
import { link } from 'react-router-dom';
import firebase from '../config/firebase';
import 'firebase/compat/firestore';

const NotificationPopup = ({message, onClose, notificationId, calendarId}) =>{
  const [userCalendars, setUserCalendars] = useState([]);
  const navigate = useNavigate();
  const firestore = firebase.firestore();

  const handleAccept = async() => {
    try{
      const NotificationRef = await firestore.collection('Notification-Data').doc(notificationId);

    const notificationDataDoc = await NotificationRef.get();

    //Make sure the document exist before going further
    if(notificationDataDoc.exists){
      const {calendarId} = notificationDataDoc.data();
      console.log('User has accepted calendarId: ', calendarId);
      await NotificationRef.update({decision: true});
      //handleNotificationInteraction(notificationId,calendarId,true,userCalendars);
      navigate(`/ViewCalendar/${calendarId}`);
      
    }
    }catch(error){
      console.error('Error handling accept: ', error);
    }
    
  };

  const handleDecline = async() => {
    try{
       // Delete the notification document
    handleNotificationInteraction(notificationId,calendarId,false,userCalendars);
    await firestore.collection('Notification-Data').doc(notificationId).delete();
    
    // Handle additional logic if needed
      console.log('Users has reject calendar: ', calendarId);
    // Close the notification popup
    onClose();
    }catch(error){
      console.error('Error deleting notification: ', error);
    }
  };

  const handleNotificationInteraction = async (notificationId, calendarId,accepted, userCalendars) =>{
    try{
      const userUid = firebase.auth().currentUser.uid;

      await firebase.firestore().collection('Notification-Data').doc(notificationId).update({
        decision: accepted,
      });

      const userDoc = await firestore.collection('users').doc(userUid).get();
      console.log(`Notification ${accepted ? 'accepted' : 'declined'}.`);

      if(userDoc.exists){
        const userData = userDoc.data();

        if (accepted) {
          console.log(`User accepted invitation for calendar ${calendarId}.`);
          // Additional logic for accepted invitation
          await firestore.collection('users').doc(userUid).update({ status: 'Attending' });
        } else {
          console.log('User declined invitation.');
          // Additional logic for declined invitation
          await firestore.collection('users').doc(userUid).update({ status: 'Not Attending' });

          //If decline remove the notification document
          await firestore.collection('Notification-Data').doc(notificationId).delete();
        }

      }

      if(accepted){
        const calendarDoc = await firestore.collection("calendars").doc(calendarId).get();
        const calendarTitle = calendarDoc.data().calendarTitle;

        //Update the calendarName in the array
        const updatedCalendars = [...userCalendars, {id: calendarId, calendarName: calendarTitle}];
        setUserCalendars(updatedCalendars);

        //Navigate to the calendar view page
        window.location.href = '/ViewCalendar/${calendarId}';

        onClose();

        
      }
      

      
    }catch(error){
      console.error('Error in handling notification interaction:', error);
    }

  }
    return(
        <div className="notification-popup">
        <div className="notification-message">{message}</div>
        <div className="decision-buttons">
        <button className="Accept-button" onClick={handleAccept}>Accept</button>
        <button className="Decline-button" onClick={handleDecline}>Decline</button>

        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    );
};

export default NotificationPopup;