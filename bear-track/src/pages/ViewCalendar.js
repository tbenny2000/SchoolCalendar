import React from "react";
import './ViewCalendar.css';
import { Link } from 'react-router-dom';

const ViewCalendar = () =>{
    return(
        <div className = "page">
        <div className="pageTitle">
            Project
        </div>
        <div className="reminder">
            <div className="reminder-text">Reminder: <button className="save-btn">SAVE</button></div>
        </div>
        <div className = "left-side-panel">
            <div className = "Logo">
            <Link to = "/homepage">
        <img src = "BearLogo.png" alt = "Logo" className="siteLogo"/>
        </Link>
        <div className="WebsiteName">DataWise</div>
            </div>

       <Link to = "/MyProfile">
        <img src = "Screenshot 2023-09-15 at 1.46 1.png" alt = "User choice" className="profilePicture"/>
        </Link>
        <div className="username">Mr. Bean</div>
        </div>
        

        <div className = "right-side-panel">
            <div className="calName">Mutual Calendar</div>
            <Link to = "/NewCalendar">
            <button className="newCalBTN">New Calendar</button>
            </Link>
        </div>
        </div>
    );
};
export default ViewCalendar;