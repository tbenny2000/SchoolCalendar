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
    const updatedAvailability = {
      selectedDays: Object.keys(newAvailability.times || {}),
      times: newAvailability.times || {},
    };

    setAvailability(updatedAvailability);
  };


  const updateAvailability = async () => {
    try {
      const availabilityRef = firestore
        .collection('calendars')
        .doc(calendarId)
        .collection('availability')
        .doc(user.uid);
  
      // Update selectedDays based on times object
      const updatedAvailability = {
        ...availability,
        selectedDays: Object.keys(availability.times || {}),
      };
  
      await availabilityRef.set({ ...updatedAvailability });
      console.log("Adding availability for: ", user.uid);
      console.log('Availability updated successfully!');
  
      // Fetch team availability and wait for it to complete
      await fetchTeamAvailability(calendarId);
  
      findCommonAvailability();
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const fetchTeamAvailability = async (calendarId) => {
    try {
      const teamAvailabilityRef = firestore
        .collection('calendars')
        .doc(calendarId)
        .collection('availability');
  
      const teamAvailabilitySnapshot = await teamAvailabilityRef.get();
      const teamAvailabilityData = teamAvailabilitySnapshot.docs
        .map((doc) => ({
          uid: doc.id,
          availability: doc.data(),
        }))
        .filter((teamMember) => teamMember.availability.selectedDays && teamMember.availability.selectedDays.length > 0);
  
      setTeamAvailability(teamAvailabilityData);
  
      findCommonAvailability();
    } catch (error) {
      console.error('Error fetching team availability:', error);
    }
  };

  const findCommonAvailability = () => {
    try {
      const currentAvailability = availability;
      const teamAvailabilities = teamAvailability.map((teamMember) => teamMember.availability);
  
      let commonAvailability = [];
      let currentAvailabilityTimes = []; 
  
      if (currentAvailability.selectedDays && currentAvailability.selectedDays.length > 0) {
        currentAvailability.selectedDays.forEach((day) => {
          console.log('Processing Day:', day);
  
          // Update the value instead of declaring it again
          currentAvailabilityTimes = (currentAvailability.times && currentAvailability.times[day]) || [];
          console.log('Current Availability Times:', currentAvailabilityTimes);
  
          if (currentAvailabilityTimes.length > 0) {
            const commonTimesForDay = [];
  
            teamAvailabilities.forEach((userAvailability) => {
              const userAvailabilityTimes = (userAvailability.times && userAvailability.times[day]) || [];
              console.log(`User ${userAvailability.uid}'s Availability Times:`, userAvailabilityTimes);
  
              const overlappingTimes = userAvailabilityTimes.filter((userTime) =>
                currentAvailabilityTimes.some((currentTime) =>
                  areTimeSlotsOverlapping(userTime, currentTime)
                )
              );
  
              if (overlappingTimes.length > 0) {
                commonTimesForDay.push({ user: userAvailability.uid, times: overlappingTimes });
              }
            });
  
            if (commonTimesForDay.length > 0) {
              commonAvailability.push({ day, times: commonTimesForDay });
            }
          }
        });
  
        // Process commonAvailability to find the time range with the most overlap
        const bestTimeToMeet = processCommonAvailability(commonAvailability, currentAvailabilityTimes);
        console.log('Best Time to Meet:', bestTimeToMeet);
  
      } else {
        console.error('Selected days are undefined or empty.');
      }
  
      console.log('Selected Days:', currentAvailability.selectedDays);
      console.log('Team Availabilities:', teamAvailabilities);
      console.log('Common availability:', commonAvailability);
  
      setCommonAvailability(commonAvailability);
      return commonAvailability;
    } catch (error) {
      console.error('Error in findCommonAvailability:', error);
      return [];
    }
  };
  
  const processCommonAvailability = (commonAvailability, userTimes) => {
    // Process commonAvailability to find the time range with the most overlap
    let bestTimeToMeet = null;
    let maxOverlapCount = 0;
  
    commonAvailability.forEach((availability) => {
      const overlappingTimes = availability.times.map((userAvailability) => userAvailability.times);
  
      const intersectedTimes = overlappingTimes.reduce((acc, userTimes) => {
        return acc.filter((time) =>
          userTimes.some(
            (userTime) =>
              areTimeSlotsOverlapping(time, userTime) || areTimeSlotsOverlapping(userTime, time)
          )
        );
      });
  
      const overlapCount = intersectedTimes.length;
  
      if (overlapCount > maxOverlapCount) {
        maxOverlapCount = overlapCount;
        bestTimeToMeet = {
          day: availability.day,
          times: intersectedTimes.map((time) => {
            // Ensure the end time does not exceed the user's availability
            const endTime = userTimes.reduce((latestEndTime, userTime) => {
              if (areTimeSlotsOverlapping(userTime, time) && userTime.end < latestEndTime) {
                return userTime.end;
              }
              return latestEndTime;
            }, time.end);
  
            return {
              start: time.start,
              end: endTime,
            };
          }),
        };
      }
    });
  
    return bestTimeToMeet;
  };
  
  
  const areTimeSlotsOverlapping = (time1, time2) => {
    // Check if the start time of one slot is before the end time of the other and vice versa
    return time1.start < time2.end && time1.end > time2.start;
  };
  

  const setCommonAvailability = async (commonAvailability) => {
    try {
      console.log('Common availability to be set:', commonAvailability);
  
      const dataToSet = {};
  
      commonAvailability.forEach((item) => {
        const day = item.day;
        const times = item.times.map((time) => {
          return {
            start: time.start || null, // Set to null if undefined
            end: time.end || null,     // Set to null if undefined
          };
        });
  
        // Additional logging to identify undefined values
        if (times.some((time) => time.start === undefined || time.end === undefined)) {
          console.error('Undefined values found in times array:', times);
        }
  
        // Remove any undefined values
        const filteredTimes = times.filter((time) => time.start !== undefined && time.end !== undefined);
  
        if (filteredTimes.length > 0) {
          dataToSet[day] = filteredTimes;
        }
      });
  
      console.log('Data to set:', dataToSet);
  
      const commonAvailabilityRef = firestore
        .collection('calendars')
        .doc(calendarId)
        .collection('commonAvailability')
        .doc(user.uid);
  
      await commonAvailabilityRef.set({ ...dataToSet });
  
      console.log('Common availability updated successfully!');
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
