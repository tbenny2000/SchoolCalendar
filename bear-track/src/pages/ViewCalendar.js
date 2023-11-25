import React, { useEffect, useState } from 'react';
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
  const [bestTimeToMeet, setBestTimeToMeet] = useState(null);
  const [showBestTime, setShowBestTime] = useState(false);
  const [bestTime, setBestTime] = useState(null);

  const firestore = firebase.firestore();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchUserAvailability(calendarId, user.uid);
        const teamAvailabilityData = await fetchTeamAvailability(calendarId);
        fetchTeamAvailabilityOnCommonDays(teamAvailabilityData);
      }
    };
  
    fetchData();
  }, [calendarId, user]);

  const handleAvailabilityChange = (newAvailability) => {
    // Handle changes in availability form
    const updatedAvailability = {
      selectedDays: Object.keys(newAvailability.times || {}),
      times: newAvailability.times || {},
    };
    setAvailability(updatedAvailability);
  };

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

  const fetchTeamAvailability = async (calendarId) => {
    try {
      const teamAvailabilityRef = firestore
        .collection('calendars')
        .doc(calendarId)
        .collection('availability');
  
      const teamAvailabilitySnapshot = await teamAvailabilityRef.get();
      const teamAvailabilityData = teamAvailabilitySnapshot.docs
        .map((doc) => ({ uid: doc.id, ...doc.data() }))
        .filter((teamMember) => teamMember.selectedDays && teamMember.selectedDays.length > 0);
  
      setTeamAvailability(teamAvailabilityData);
  
      return teamAvailabilityData; // Add this line
    } catch (error) {
      console.error('Error fetching team availability:', error);
      return [];
    }
  };

  const fetchTeamAvailabilityOnCommonDays = async (commonDays) => {
    try {
      const teamAvailabilityData = await fetchTeamAvailability(calendarId);
  
      // Filter the team availability data to include only common days
      const teamAvailabilityOnCommonDays = teamAvailabilityData.map((teamMember) => ({
        uid: teamMember.uid,
        times: commonDays.reduce((acc, day) => ({ ...acc, [day]: teamMember.times[day] || [] }), {}),
      }));
  
      console.log('Team Availability On Common Days:', teamAvailabilityOnCommonDays);
      return teamAvailabilityOnCommonDays;
    } catch (error) {
      console.error('Error fetching team availability on common days:', error);
      return [];
    }
  };

  const handleShowBestTime = async () => {
    try {
      console.log('Handling Show Best Time...');
      await findBestTimeToMeet();
    } catch (error) {
      console.error('Error in handleShowBestTime:', error);
    }
  };
  
  const findBestTimeToMeet = async () => {
    // Find common days among all users
    console.log('Inside findBestTimeToMeet');
    const commonDays = findCommonDays();
  
    if (commonDays.length === 0) {
      setBestTime(null);
      return;
    }
  
    // Find overlapping time slots on common days
    const overlappingTimes = await findOverlappingTimes(commonDays);
  
    // Determine the best time to meet
    const bestTime = processOverlappingTimes(overlappingTimes);
  
    // Set the best time to meet in the state
    setBestTime(bestTime);
  };

  const compareTimeSlots = (commonDays, teamAvailabilityData) => {
    console.log('Raw Team Availability Data:', teamAvailabilityData);
  
    // Ensure teamAvailabilityData is an array
    const teamAvailabilityArray = Array.isArray(teamAvailabilityData)
      ? teamAvailabilityData
      : Object.values(teamAvailabilityData);
  
    console.log('Team Availability Array:', teamAvailabilityArray);
  
    // Compare time slots for each common day
    const overlappingTimes = commonDays.reduce((acc, day) => {
      const currentUserTimes = availability.times[day] || [];
      const teamMemberTimes = teamAvailabilityArray.reduce((times, teamMember) => {
        return times.concat(teamMember.times[day] || []);
      }, []);
  
      // Find overlapping times for each team member
      const overlappingTimesForDay = teamMemberTimes.filter((teamTime) =>
        currentUserTimes.some((userTime) => areTimeSlotsOverlapping(userTime, teamTime))
      );
  
      // Set day explicitly
      acc[day] = overlappingTimesForDay;
  
      return acc;
    }, {});
  
    console.log('Overlapping Times:', overlappingTimes);
  
    return overlappingTimes;
  };
  
  

  const findCommonDays = () => {
    // Extract selected days of the current user
    const currentUserDays = availability.selectedDays || [];

    // Extract selected days of team members
    const teamDays = teamAvailability.map((teamMember) => teamMember.selectedDays || []);

    // Find the common days among all users
    const commonDays = currentUserDays.filter((day) => teamDays.every((teamDays) => teamDays.includes(day)));

    return commonDays;
  };

  const findOverlappingTimes = async (commonDays) => {
    const teamAvailabilityOnCommonDays = await fetchTeamAvailabilityOnCommonDays(commonDays);
  
    const overlappingTimes = compareTimeSlots(commonDays, teamAvailabilityOnCommonDays);
  
    console.log('Overlapping Times:', overlappingTimes);
    return overlappingTimes;
  };

  const areTimeSlotsOverlapping = (time1, time2) => {
    const start1 = new Date(`2000-01-01T${time1.start}`);
    const end1 = new Date(`2000-01-01T${time1.end}`);
    const start2 = new Date(`2000-01-01T${time2.start}`);
    const end2 = new Date(`2000-01-01T${time2.end}`);

    return start1 < end2 && end1 > start2;
  };

 
  const processOverlappingTimes = (overlappingTimes) => {
    // Process overlapping times to find the best time to meet
    // This includes finding the latest start time and earliest end time for each day
  
    console.log('Before loop - overlappingTimes:', overlappingTimes);
  
    const bestTime = Object.entries(overlappingTimes).reduce((acc, [day, times]) => {
      console.log('Inside loop - day:', day, 'times:', times);
  
      if (!acc.day || times.length > acc.times.length) {
        acc.day = day;
        acc.times = times;
      } else if (times.length === acc.times.length) {
        // If the same number of overlapping slots, consider the latest start time
        const latestStartTime = Math.max(...times.map((time) => parseInt(time.start, 10)));
        const currentLatestStartTime = Math.max(...acc.times.map((time) => parseInt(time.start, 10)));
  
        if (latestStartTime > currentLatestStartTime) {
          acc.day = day;
          acc.times = times;
        }
      }
      return acc;
    }, { day: null, times: [] });
  
    // Find the latest start time and earliest end time
    const latestStartTime = Math.max(...bestTime.times.map((time) => parseInt(time.start, 10)));
    const earliestEndTime = Math.min(...bestTime.times.map((time) => parseInt(time.end, 10)));
  
    // Set the overall start and end times
    bestTime.start = latestStartTime;
    bestTime.end = earliestEndTime;
  
    console.log('After loop - bestTime:', bestTime);
  
    return bestTime;
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
      console.log('availRef" ', updatedAvailability);
      console.log(calendarId);
      await availabilityRef.update({ ...updatedAvailability });
      console.log("Adding availability for: ", user.uid);
      console.log('Availability updated successfully!');
  
      // Fetch team availability
      const teamAvailabilityData = await fetchTeamAvailability(calendarId);
  
      // Find common availability
      findCommonAvailability(updatedAvailability, teamAvailabilityData);
  
      // Reset showBestTime state
      setShowBestTime(false);
  
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const findCommonAvailability = () => {
    // Find common availability logic
    try {
      // ... (Your logic for finding common availability)
    } catch (error) {
      console.error('Error in findCommonAvailability:', error);
    }
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
        <button className="saveButton" type="button" onClick={() => updateAvailability()}>
          Save
        </button>
        <Link to = "/HomePage"> <button className='buttons'>Homepage</button>  </Link>

        <button
          className="showBestTimeButton"
          type="button"
          onClick={handleShowBestTime}
        >
          Show Best Time
        </button>

        {bestTime && (
  <div>
    <p>Best Time to Meet:</p>
    <p>Day: {bestTime.day}</p>
    <p>Time:</p>
    <p>
      Start: {bestTime.start !== undefined ? `${bestTime.start}:00` : ''}
      {bestTime.start !== undefined && bestTime.end !== undefined ? '-' : ''}
      {bestTime.end !== undefined ? `${bestTime.end}:00` : ''}
    </p>
      </div>
      )}
      </div>
    </div>    
  );
};


export default ViewCalendar;
