import React from "react";
import './ViewCalendar.css';
import { useState, useEffect } from 'react';
import firebase from "../config/firebase";
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';

const ViewCalendar = () => {
    const [username, setUName] = useState('');
    const [userID, setUserID] = useState('');
    const [email, setEmailAddress] = useState('');

    const firestore = firebase.firestore();
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            if(user){
                const uuid = user.uid;
                dataReading(uuid);
            }
        });
        return () => unregisterAuthObserver();
    }, []);

    const uuid = firebase.auth().currentUser.uid;

    const dataReading = async(userUID) =>{
        try{
            const userReference = firestore.collection('users').doc(userUID);
            console.log(userUID);
            const userDoc = await userReference.get();
            if(userDoc.exists){
                console.log('Printing from userDoc: ', userDoc.data);
                const uName = userDoc.data().username;
                const userid = userDoc.data().userID;
                const eAddress = userDoc.data().email;

                setUName(uName);
                setUserID(userid);
                setEmailAddress(eAddress);
            }else{
                console.log('User document not found.');
            }
        }catch (error){
            console.log('Error loading Firestore document:', error);
        }
    };
    console.log(firebase.auth().currentUser.uid);
    dataReading(uuid);
    

    return(
        <div className = "page">
        <div className="pageTitle">
            Project
        </div>
        <div className="reminder">
            <div className="reminder-text">Reminder: <button className="save-btn">SAVE</button></div>
        </div>
        <div className = "left-side-panel"></div>
            <div className = "Logo">
            <Link to = "/homepage">
        <img src = "BearLogo.png" alt = "Logo" className="siteLogo"/>
        </Link>
        <div className="WebsiteName">DataWise</div>
            </div>

       <Link to = "/MyProfile">
        <img src = "Screenshot 2023-09-15 at 1.46 1.png" alt = "User choice" className="profilePicture"/>
        </Link>
        <div className="username">
            {username}
        </div>
        

        <div className = "right-side-panel"></div>
            <div className="calName">Mutual Calendar</div>
            <Link to = "/NewCalendar">
            <button className="newCalBTN">New Calendar</button>
            </Link>
        </div>
    );
}
export default ViewCalendar;