import React, { useState, useEffect } from "react";
import "./ViewCalendar.css";
import firebase from "../config/firebase";
import "firebase/compat/firestore";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

const ViewCalendar = ({ match }) => {
  const user = useUser();
  const [calendarData, setCalendarData] = useState(null);

  useEffect(() => {
    const calendarId = match.params.id;
    loadCalendarData(calendarId);
  }, [match.params.id]);

  const loadCalendarData = async (calendarId) => {
    try {
      const firestore = firebase.firestore();
      const calendarRef = firestore.collection("calendars").doc(calendarId);
      const calendarDoc = await calendarRef.get();

      if (calendarDoc.exists) {
        const calendarData = calendarDoc.data();
        setCalendarData(calendarData);
      } else {
        console.log("Calendar document not found.");
      }
    } catch (error) {
      console.error("Error loading calendar data:", error);
    }
  };

  return (
    <div className="page">
      <div className="pageTitle">Project</div>

      <div className="reminder">
        <div className="reminder-text">
          Reminder:{" "}
          <input name="meeting time" id="meeting-time" type="time" />
          <button className="save-btn">SAVE</button>
        </div>
      </div>
      <div className="left-side-panel"></div>
      <div className="Logo">
        <Link to="/homepage">
          <img src="BearLogo.png" alt="Logo" className="siteLogo" />
        </Link>
        <div className="WebsiteName">DateWise</div>
      </div>

      <div className="profilePicture">
        <Link to="/MyProfile">
          <img
            alt="User profile"
            src={user.image}
            className="profilePhoto"
          />
        </Link>
        <div className="username">{user.userName}</div>
      </div>

      <div className="right-side-panel"></div>
      <div className="calName">{calendarData?.calendarName}</div>
      <div style={{ overflowY: "scroll", height: "150px" }} className="meeting-section">
        {calendarData?.users &&
          calendarData.users.map((userId) => (
            <div key={userId}>{/* Fetch and display user email based on userId */}</div>
          ))}
      </div>
      <Link to="/NewCalendar">
        <button className="newCalBTN">New Calendar</button>
      </Link>
    </div>
  );
};

export default ViewCalendar;
