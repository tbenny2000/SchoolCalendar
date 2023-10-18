import React from 'react';
import './HomePage.css'; // Import your CSS file for styling
import firebase from '../config/firebase'; // Import your firebase.js file
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
      <h1>My Calendar <span id="name"></span></h1>
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

        <div className='profileName'>Mr.Bean</div>

          
      
        <Link to="/">
        <button className="logout-button">Logout</button>

        </Link>
      <div className = "right-panel">
        <div className = "calendarName">Mutual Calendar</div>
        <button className='new-calendar-button'>New Calendar</button>
      </div>
    </div>
  );
};

export default HomePage;
