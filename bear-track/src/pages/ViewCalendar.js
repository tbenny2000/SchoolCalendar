import React, { useEffect, useState } from 'react';
import './ViewCalendar.css';
import firebase from '../config/firebase';
import 'firebase/compat/firestore';
import { Link, useParams } from 'react-router-dom';
import { useUser } from './UserContext';
import AvailabilityForm from '../components/Calendar/AvailabilityForm';

const ViewCalendar = () => {
    const { calendarId, calendarName } = useParams();
    const user = useUser();
    const [availability, setAvailability] = useState({
      selectedDays: [],
      times: {},
    });
  
    const firestore = firebase.firestore();
  
    useEffect(() => {
      if (user) {
        fetchUserAvailability(calendarId, user.uid);
      }
    }, [calendarId, user]);
  
    const fetchUserAvailability = async (calendarId, uid) => {
      try {
        const availabilityRef = firestore
          .collection('calendars')
          .doc(calendarId)
          .collection('availability')
          .doc(uid);
  
        const availabilitySnapshot = await availabilityRef.get();
  
        if (availabilitySnapshot.exists) {
          const availabilityData = availabilitySnapshot.data();
          setAvailability(availabilityData);
        }
      } catch (error) {
        console.error('Error fetching user availability:', error);
      }
    };
  
    const handleAvailabilityChange = (newAvailability) => {
      setAvailability(newAvailability);
      // Update the availability in Firestore when the form is updated
      // updateAvailabilityInFirestore(newAvailability);
    };
  
    const updateAvailability = async () => {
      try {
        const availabilityRef = firestore
          .collection('calendars')
          .doc(calendarId)
          .collection('availability')
          .doc(user.uid);
  
        await availabilityRef.set(availability);
        console.log("Adding availability for: ",user.uid)
        console.log('Availability updated successfully!');
      } catch (error) {
        console.error('Error updating availability:', error);
      }
    };
  
    return (
      <div className="page">
        <div className="pageTitle">{calendarName}</div>
        
        <div className="reminder">
            <div className="reminder-text">Reminder: <input name = "meeting time" id = "meeting-time" type = 'time'/><button className="save-btn">SAVE</button></div>
        </div>
        <div className = "left-side-panel"></div>
            <div className = "Logo">
            <Link to = "/homepage">
        <img src = "BearLogo.png" alt = "Logo" className="siteLogo"/>
        </Link>
        <div className="WebsiteName">DateWise</div>
            </div>

        
        <div className="profilePicture">
        <Link to = "/MyProfile">
            <img alt = "User profile" src = {user.image} className='profilePhoto'/>
          </Link>
          <div className='username' >{user.userName}</div>
        </div>
        
        <div className="meeting-section">
        <AvailabilityForm
          className="avform"
          availability={availability}
          onAvailabilityChange={handleAvailabilityChange}
        />
        <button className="saveButton" type="button" onClick={updateAvailability}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ViewCalendar;






