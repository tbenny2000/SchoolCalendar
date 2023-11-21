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
          uid: doc.id, // Include the user ID
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
        if (currentAvailability.times && currentAvailability.times[day] && currentAvailability.times[day].length > 0) {
          const commonTimesForDay = [];
    
          teamAvailabilities.forEach((userAvailability) => {
            const userAvailabilityTimes = userAvailability.times[day] || [];
    
            // Check if the user ID is defined before processing the availability data
            if (userAvailability.uid) {
              // Find the overlapping times
              const overlappingTimes = userAvailabilityTimes.filter((userTime) =>
                currentAvailability.times[day].some((currentTime) =>
                  areTimeSlotsOverlapping(userTime, currentTime)
                )
              );
    
              console.log('Day:', day);
              console.log('Overlapping Times:', overlappingTimes.map(time => ({ day, ...time }))); // Include the day in each overlapping time
    
              if (overlappingTimes.length > 0) {
                // Find the best time within the overlapping times
                const bestTime = overlappingTimes.reduce((max, time) =>
                  time.end - time.start > max.end - max.start ? time : max
                );
    
                commonTimesForDay.push({ user: userAvailability.uid, time: bestTime });
              }
            }
          });
    
          if (commonTimesForDay.length > 0) {
            // Add day and common times to commonAvailability
            commonAvailability.push({ day, time: commonTimesForDay });
          }
        }
      });
    
      console.log('Selected Days:', currentAvailability.selectedDays);
      console.log('Team Availabilities:', teamAvailabilities);
      console.log('Common availability:', commonAvailability);
      setCommonAvailability(commonAvailability);
      return commonAvailability;
    };

    const areTimeSlotsOverlapping = (time1, time2) => {
      return time1.start < time2.end && time1.end > time2.start;
    }

    const setCommonAvailability = async (commonAvailability) => {
      try {
        if (commonAvailability) {
          console.log('Common availability to be set:', commonAvailability);  // Add this line for debugging
    
          const commonAvailabilityRef = firestore
            .collection('calendars')
            .doc(calendarId)
            .collection('commonAvailability')
            .doc(user.uid);
    
          await commonAvailabilityRef.set({ commonAvailability });
          console.log('Common availability updated successfully!');
        } else {
          console.error('Common availability is undefined.');
        }
      } catch (error) {
        console.error('Error updating common availability:', error);
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
        </div>
    </div>
  );
};

export default ViewCalendar;






