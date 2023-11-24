// // import React, { useState } from "react";
// // import './NotificationPopup.css';
// // import { useNavigate } from "react-router-dom";
// // import { link } from 'react-router-dom';
// // import firebase from '../config/firebase';
// // import 'firebase/compat/firestore';

// // const NotificationPopup = ({message, onClose, notificationId, calendarId}) =>{
// //   const [userCalendars, setUserCalendars] = useState([]);
// //   const navigate = useNavigate();
// //   const firestore = firebase.firestore();

// //   const handleAccept = async() => {
// //     try{
// //   //     const notificationRef = await firestore.collection('Notification-Data').doc(notificationId);

// //   //   const notificationDataDoc = await notificationRef.get();

// //   //   //Make sure the document exist before going further
// //   //   // if(notificationDataDoc.exists){
// //   //   //   const {calendarId} = notificationDataDoc.data();
// //   //   //   console.log('User has accepted calendarId: ', calendarId);
// //   //   //   await NotificationRef.update({decision: true});
// //   //   //   //handleNotificationInteraction(notificationId,calendarId,true,userCalendars);
// //   //   //   navigate(`/ViewCalendar/${calendarId}`);
      
// //   //   // }


// //   //   if (notificationDataDoc.exists) {
// //   //     const { calendarId } = notificationDataDoc.data();
// //   //     console.log('User has accepted calendarId: ', calendarId);
// //   //     await notificationRef.update({ decision: true });

// //   //     const userUid = firebase.auth().currentUser.uid;
// //   //     const userDocRef = firestore.collection('users').doc(userUid);

// //   //     // Check if 'calendars' field exists in user's document
// //   //     const userDoc = await userDocRef.get();
// //   //     if (userDoc.exists) {
// //   //       console.log("User Doc was found, now adding calendars:")
// //   //       const userData = userDoc.data();
// //   //       let updatedCalendars = userData.calendars || [];

// //   //       // Add the new calendar to the user's calendars
// //   //       updatedCalendars.push({ id: calendarId, calendarName: 'Loading...' });

// //   //       // Update the 'calendars' field in the user's document
// //   //       await userDocRef.set({ calendars: updatedCalendars }, { merge: true });

// //   //       setUserCalendars(updatedCalendars);
// //   //       // navigate(`/ViewCalendar/${calendarId}`);
// //   //     }
// //   //   }




// //       const notificationRef = firestore.collection('Notification-Data').doc(notificationId);
// //       const notificationDataDoc = await notificationRef.get();

// //       if (notificationDataDoc.exists) {
// //         const { calendarId } = notificationDataDoc.data();
// //         console.log('User has accepted calendarId: ', calendarId);
// //         await notificationRef.update({ decision: true });

// //         const userUid = firebase.auth().currentUser.uid;
// //         const userDocRef = firestore.collection('users').doc(userUid);

// //         // Check if 'calendars' field exists in user's document
// //         const userDoc = await userDocRef.get();
// //         if (userDoc.exists) {
// //           console.log("User document exists");
// //           const userData = userDoc.data();

// //           // Check if 'calendars' field is already present or not
// //           if (!userData.hasOwnProperty('calendars')) {
// //             console.log("Calendars field does not exist, creating...");
// //             await userDocRef.set({ calendars: [] }, { merge: true });
// //           }

// //           let updatedCalendars = userData.calendars || [];

// //           // Add the new calendar to the user's calendars
// //           updatedCalendars.push({ id: calendarId, calendarName: 'Loading...' });

// //           // Update the 'calendars' field in the user's document
// //           await userDocRef.update({ calendars: updatedCalendars });

// //           setUserCalendars(updatedCalendars);
// //           navigate(`/ViewCalendar/${calendarId}`);
// //         } else {
// //           console.log("User document doesn't exist");
// //         }
// //       }





// //     } catch(error){
// //       console.error('Error handling accept: ', error);
// //     }
    
// //   };

  
// //   const handleDecline = async() => {
// //     try{
// //        // Delete the notification document
// //     handleNotificationInteraction(notificationId,calendarId,false,userCalendars);
// //     await firestore.collection('Notification-Data').doc(notificationId).delete();
    
// //     // Handle additional logic if needed
// //       console.log('Users has rejected calendar: ', calendarId);
// //     // Close the notification popup
// //     onClose();
// //     }catch(error){
// //       console.error('Error deleting notification: ', error);
// //     }
// //   };

// //   const handleNotificationInteraction = async (notificationId, calendarId,accepted, userCalendars) =>{
// //     try{
// //       const userUid = firebase.auth().currentUser.uid;

// //       await firebase.firestore().collection('Notification-Data').doc(notificationId).update({
// //         decision: accepted,
// //       });

// //       const userDoc = await firestore.collection('users').doc(userUid).get();
// //       console.log(`Notification ${accepted ? 'accepted' : 'declined'}.`);

// //       if(userDoc.exists){
// //         const userData = userDoc.data();

// //         if (accepted) {
// //           console.log(`User accepted invitation for calendar ${calendarId}.`);
// //           // Additional logic for accepted invitation
// //           await firestore.collection('users').doc(userUid).update({ status: 'Attending' });
// //         } else {
// //           console.log('User declined invitation.');
// //           // Additional logic for declined invitation
// //           await firestore.collection('users').doc(userUid).update({ status: 'Not Attending' });

// //           //If decline remove the notification document
// //           await firestore.collection('Notification-Data').doc(notificationId).delete();
// //         }

// //       }

// //       if(accepted){
// //         const calendarDoc = await firestore.collection("calendars").doc(calendarId).get();
// //         const calendarTitle = calendarDoc.data().calendarTitle;

// //         //Update the calendarName in the array
// //         const updatedCalendars = [...userCalendars, {id: calendarId, calendarName: calendarTitle}];
// //         setUserCalendars(updatedCalendars);

// //         //Navigate to the calendar view page
// //         window.location.href = '/ViewCalendar/${calendarId}';

// //         onClose();

        
// //       }
      

      
// //   const notificationRef = firestore.collection('Notification-Data').doc(notificationId);
// //       const notificationDataDoc = await notificationRef.get();

// //       if (notificationDataDoc.exists) {
// //         const { calendarId } = notificationDataDoc.data();
// //         console.log('User has accepted calendarId: ', calendarId);
// //         await notificationRef.update({ decision: true });

// //         const userUid = firebase.auth().currentUser.uid;
// //         const userDocRef = firestore.collection('users').doc(userUid);

// //         // Check if 'calendars' field exists in user's document
// //         const userDoc = await userDocRef.get();
// //         if (userDoc.exists) {
// //           console.log("User document exists");
// //           const userData = userDoc.data();

// //           // Check if 'calendars' field is already present or not
// //           if (!userData.hasOwnProperty('calendars')) {
// //             console.log("Calendars field does not exist, creating...");
// //             await userDocRef.set({ calendars: [] }, { merge: true });
// //           }

// //           let updatedCalendars = userData.calendars || [];

// //           // Add the new calendar to the user's calendars
// //           updatedCalendars.push({ id: calendarId, calendarName: 'Loading...' });

// //           // Update the 'calendars' field in the user's document
// //           await userDocRef.update({ calendars: updatedCalendars });

// //           setUserCalendars(updatedCalendars);
// //           navigate(`/ViewCalendar/${calendarId}`);
// //         } else {
// //           console.log("User document doesn't exist");
// //         }
// //       } 




// //     }catch(error){
// //       console.error('Error in handling notification interaction:', error);
// //     }

// //   }
// //     return(
// //         <div className="notification-popup">
// //         <div className="notification-message">{message}</div>
// //         <div className="decision-buttons">
// //         <button className="Accept-button" onClick={handleAccept}>Accept</button>
// //         <button className="Decline-button" onClick={handleDecline}>Decline</button>

// //         </div>
// //         <button className="close-button" onClick={onClose}>
// //           Close
// //         </button>
// //       </div>
// //     );
// // };

// // export default NotificationPopup;





















// import React, { useState, useEffect } from "react";
// import './NotificationPopup.css';
// import { useNavigate } from "react-router-dom";
// import firebase from '../config/firebase';
// import 'firebase/compat/firestore';
// import { useUser } from '../pages/UserContext';


// const NotificationPopup = ({ onClose }) => {
//   const user = useUser();

//   const [notificationMessage, setNotificationMessage] = useState('');
//   const [userCalendars, setUserCalendars] = useState([]);
//   const [calendarId, setCalendarId] = useState('');
//   const [notificationId, setNotificationId] = useState('');
//   const navigate = useNavigate();
//   const firestore = firebase.firestore();


//   const loadUserNotifications = async (userUid) => {
//     try {
//       const firestore = firebase.firestore();
//       const notificationRef = firestore.collection('Notification-Data');
//       const notificationSnapshot = await notificationRef
//         .where('receiver', '==', userUid)
//         .get();
//       const notificationsData = notificationSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
  
//       console.log("notifications Data:    ", notificationsData)
//     } catch (error) {
//       console.error('Error loading user notifications:', error);
//     }
//   };


  
  
//   useEffect(() => {
//     console.log("Trying to fetch Message... ")
//     loadUserNotifications(user.uid)
//     fetchNotificationMessage();
//   }, [notificationId]);



//   const fetchNotificationMessage = async () => {
//     console.log("In the fetchNotificationMessage function...  ")
//     try {
      
//       const notificationRef = firestore.collection('Notification-Data').doc(notificationId);
//       console.log('notificationId:', notificationId);
//       const notificationDataDoc = await notificationRef.get();

//       console.log("NotificationRef: ", notificationDataDoc.data());
//       if (notificationDataDoc.exists) {
//         const message = notificationDataDoc.data().message;
//         setNotificationMessage(message);
//         console.log('message received: ' , message);
//       }
      
//     } catch (error) {
//       console.error('Error fetching notification message: ', error);
//     }
//   };


  
//   const handleAccept = async () => {
//     try {
//       const notificationRef = firestore.collection('Notification-Data').doc(notificationId);
//       const notificationDataDoc = await notificationRef.get();

//       if (notificationDataDoc.exists) {
//         const { calendarId } = notificationDataDoc.data();
//         await notificationRef.update({ decision: true });

//         const userUid = firebase.auth().currentUser.uid;
//         const userDocRef = firestore.collection('users').doc(userUid);

//         const userDoc = await userDocRef.get();
//         if (userDoc.exists) {
//           const userData = userDoc.data();

//           if (!userData.hasOwnProperty('calendars')) {
//             await userDocRef.set({ calendars: [] }, { merge: true });
//           }

//           let updatedCalendars = userData.calendars || [];
//           updatedCalendars.push({ id: calendarId, calendarName: 'Loading...' });

//           await userDocRef.update({ calendars: updatedCalendars });

//           setUserCalendars(updatedCalendars);
//           navigate(`/ViewCalendar/${calendarId}`);
//           onClose();
//         }
//       }
//     } catch (error) {
//       console.error('Error handling accept: ', error);
//     }
//   };

//   const handleDecline = async () => {
//     try {
//       await handleNotificationInteraction(notificationId, calendarId, false, userCalendars);
//       await firestore.collection('Notification-Data').doc(notificationId).delete();
//       onClose();
//     } catch (error) {
//       console.error('Error deleting notification: ', error);
//     }
//   };

//   const handleNotificationInteraction = async (notificationId, calendarId, accepted, userCalendars) => {
//     try {
//       const userUid = firebase.auth().currentUser.uid;
//       await firebase.firestore().collection('Notification-Data').doc(notificationId).update({ decision: accepted });

//       const userDoc = await firestore.collection('users').doc(userUid).get();
//       if (userDoc.exists) {
//         const userData = userDoc.data();

//         if (accepted) {
//           // Additional logic for accepted invitation
//           await firestore.collection('users').doc(userUid).update({ status: 'Attending' });
//           const calendarDoc = await firestore.collection("calendars").doc(calendarId).get();
//           const calendarTitle = calendarDoc.data().calendarTitle;
//           const updatedCalendars = [...userCalendars, { id: calendarId, calendarName: calendarTitle }];
//           setUserCalendars(updatedCalendars);
//           window.location.href = `/ViewCalendar/${calendarId}`;
//           onClose();
//         } else {
//           // Additional logic for declined invitation
//           await firestore.collection('users').doc(userUid).update({ status: 'Not Attending' });
//           await firestore.collection('Notification-Data').doc(notificationId).delete();
//         }
//       }
//     } catch (error) {
//       console.error('Error in handling notification interaction:', error);
//     }
//   };

//   return (
//     <div className="notification-popup">
//       <div className="notification-message">{notificationMessage}</div>
//       <div className="decision-buttons">
//         <button className="Accept-button" onClick={handleAccept}>Accept</button>
//         <button className="Decline-button" onClick={handleDecline}>Decline</button>
//       </div>
//       <button className="close-button" onClick={onClose}>Close</button>
//     </div>
//   );
// };

// export default NotificationPopup;







import React ,{ useState } from 'react';
import './NotificationPopup.css';

const NotificationPopup = ({ notifications, handleAccept, handleDecline, onClose }) => {
  // const [showNotification, setShowNotification] = useState(false);

  // onClose=() => setShowNotification(false);

  return (
    <div className="notification-popup">
      {notifications.map((notification, index) => (
        <div key={index} className="notification-entry">
          <p><strong>Sender:</strong> {notification.sender}</p>
          <p><strong>Message:</strong> {notification.message}</p>
          <div className = "decision-buttons">
          <button className = 'Accept-button' onClick={() => handleAccept(index)}>Accept</button>
          <button className = 'Decline-button'onClick={() => handleDecline(index)}>Decline</button>

          </div>
          
        </div>

      ))}
      <button className="close-button" onClick={onClose}>Close</button>

    </div>
  );
};

export default NotificationPopup;