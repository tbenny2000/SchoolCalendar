import React from 'react';
import './HomePage.css'; // Import your CSS file for styling
import firebase from '../config/firebase'; // Import your firebase.js file
import { Link } from 'react-router-dom';
import { useState } from 'react';
import 'firebase/compat/firestore';


const HomePage = () => {
  
  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [userName, setUName] = useState('');
  const [userID, setUserID] = useState('');
  const [emailAddress, setEAddress] = useState('');

  const loadFirestoreDocument = async (userUid) => {
  
    try {
      const firestore = firebase.firestore();
      const userRef = firestore.collection('users').doc(userUid);
      console.log(userUid);
      const userDoc = await userRef.get();
  
      if (userDoc.exists) {
        console.log('Printing from loadDoc: ',userDoc.data())
        const fName = userDoc.data().firstName;
        const lName = userDoc.data().lastName;
        const uName = userDoc.data().userName;
        const userID = userDoc.data().userID;
        const eAddress = userDoc.data().emailAddress;
  
        setFName(fName);
        setLName(lName);
        setUName(uName);
        setUserID(userID);
        setEAddress(eAddress);
      } else {
        console.log('User document not found.');
      }
    } catch (error) {
      console.error('Error loading Firestore document:', error);
    }
    
  };
  console.log(firebase.auth().currentUser.uid)
  loadFirestoreDocument(firebase.auth().currentUser.uid)  

  return (
    <div className="homepage">
      <h1>My Calendar: {firstName}</h1>
      <div className = "left-panel">
      </div>
      <div className='logo-photo'>
            <img src = "./logo.png" alt="Grizzly Bear face"/>
            <div className='titleStyle'>DateWise</div>
      </div>
      <Link to = "/MyProfile">
          <div>
            <img alt = "User profile" src = "./Screenshot 2023-09-15 at 1.46 1.png" className='user-photo'/>
      </div>
          </Link>

        <div className='profileName' >{userName}</div>

          
      
        <Link to="/">
        <button className="logout-button">Logout</button>

        </Link>
      <div className = "right-panel">
        <div className = "calendarName">Mutual Calendar</div>
        <Link to = "/NewCalendar">
        <button className='new-calendar-button'>New Calendar</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
