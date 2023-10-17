import React from 'react';
import './HomePage.css'; // Import your CSS file for styling
import firebase from './firebase'; // Import your firebase.js file
import {
  getFirestore, collection, getDocs, query, where,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
// import Login from './components/Login';
const HomePage = () => {
  console.log(firebase.auth().currentUser.uid)
  const db = getFirestore();
  
  const colRef = collection(db, 'users');
  var user = "";

  // queries
  const q = query(colRef, where("uuid", "==", firebase.auth().currentUser.uid))

  getDocs(q, colRef)
      .then((snapshot) => {
          let users = []
          snapshot.docs.forEach((doc) => {
              users.push({ ...doc.data(), id: doc.id }) // pushes object into array
            
          })
          
          console.log(users);
          
          user = users[0];
          console.log(user);

          document.getElementById("name").innerHTML = user.firstName;
         
          document.getElementById("emailAddress").innerHTML = user.emailAddress;
          
          
      })
      .catch(err => {
          console.log(err.message)
      })

  return (
    <div className="homepage">

      <div className="right-panel">
      <div className="user-info">
          <h1>Welcome, <span id="name"></span></h1>
          <p>Email Address: <span id="emailAddress"></span></p>
          <div className='logo-photo'>
            <img src = "./logo.png"/>
          </div>
          <Link to = "./src/MyProfile.js">
          <div>
            <img alt = "User profile photo" src = "./Screenshot 2023-09-15 at 1.46 1.png" className='user-photo'/>
      </div>
          </Link>
          

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
