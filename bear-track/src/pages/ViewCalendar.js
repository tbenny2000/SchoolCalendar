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

    const [teamAvailability, setTeamAvailability] = useState([]);
  
    const firestore = firebase.firestore();
  
    useEffect(() => {
      if (user) {
        fetchUserAvailability(calendarId, user.uid);
      }
    }, [calendarId, user]);

    useEffect(() => {
      if (teamAvailability.length > 0) {
        findCommonAvailability();
      }
    }, [teamAvailability]);
  
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

    useEffect(() => {
      if (teamAvailability.length > 0) {
        findCommonAvailability();
      }
    }, [teamAvailability]);

    const fetchTeamAvailability = async (calendarId) => {
      try {
        const teamAvailabilityRef = firestore
          .collection('calendars')
          .doc(calendarId)
          .collection('availability');

          const teamAvailabilitySnapshot = await teamAvailabilityRef.get();
          const teamAvailabilityData = teamAvailabilitySnapshot.docs.map((doc) => ({
            uid: doc.id,
            availability: doc.data(),
          }));

          setTeamAvailability(teamAvailabilityData);
      } catch (error) {
        console.error('Error fetching team availability:', error);
      }
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
        fetchTeamAvailability(calendarId);
      } catch (error) {
        console.error('Error updating availability:', error);
      }
    };

    const findCommonAvailability = () => {
      const currentAvailability = availability;
      const teamAvailabilities = teamAvailability.map((teamMember) => teamMember.availability);
      let commonAvailability = [];
    
      currentAvailability.selectedDays.forEach((day) => {
        if (currentAvailability.times[day]) {
          currentAvailability.times[day].forEach((time) => {
            const timeIsAvailable = teamAvailabilities.every((userAvailability) => {
              const userAvailabilityTimes = userAvailability.times[day];
              return userAvailabilityTimes && userAvailabilityTimes.includes(time);
            });
            if (timeIsAvailable) {
              commonAvailability.push({
                day,
                time,
              });
            }
          });
        }
      });
    
      console.log('Common availability:', commonAvailability);
    };
  
    return (
      <div className="page">
        <div className="pageTitle">{calendarName}</div>
        
     

        
            <div className="profilePicture">
  <Link to="/MyProfile">
    {user && user.image && <img alt="User profile" src={user.image} className='profilePhoto'/>}
  </Link>
  <div className='username'>{user && user.userName}</div>
</div>
        
        <div className="meeting-section">
          <AvailabilityForm
            className="avform"
            availability={availability}
            onAvailabilityChange={handleAvailabilityChange}
          />
          <button className="saveButton" type="button" onClick={() => { updateAvailability(); findCommonAvailability(); }}>
            Save
          </button>
          <Link to = "/HomePage"> <button className='buttons'>Homepage</button>  </Link>  
        </div>
    </div>
  );
};

export default ViewCalendar;






