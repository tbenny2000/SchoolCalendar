import React from "react";
import './ViewCalendar.css';
import firebase from "../config/firebase";
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';
import { useUser} from './UserContext';

const ViewCalendar = () => {

    const user = useUser();

    if(user.imageURL == null){
        user.image = './Screenshot 2023-09-15 at 1.46 1.png';
        console.log("Printing from image addition")
    }else{
        user.image = user.imageURL;
        console.log('Printing from successful image addition');
    }

    console.log(firebase.auth().currentUser.uid)
    // const [username, setUName] = useState('');
    // const [userID, setUserID] = useState('');
    // const [email, setEmailAddress] = useState('');

    // const firestore = firebase.firestore();
    // useEffect(() => {
    //     const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
    //         if(user){
    //             const uuid = user.uid;
    //             dataReading(uuid);
    //         }
    //     });
    //     return () => unregisterAuthObserver();
    // }, []);

    // const uuid = firebase.auth().currentUser.uid;

    // const dataReading = async(uuid) =>{
    //     try {
    //         const userRef = firestore.collection('users').doc(uuid);
    //         console.log(uuid);
    //         const userDoc = await userRef.get();
        
    //         if (userDoc.exists) {
    //           console.log('Printing from loadDoc: ',userDoc.data())
    //           const uName = userDoc.data().userName;
    //           const userID = userDoc.data().userID;
    //           const eAddress = userDoc.data().emailAddress;
        
            
    //           setUName(uName);
    //           setUserID(userID);
    //           setEmailAddress(eAddress);
    //           console.log(uName);
      
    //         } else {
    //           console.log('User document not found.');
    //         }
    //       } catch (error) {
    //         console.error('Error loading Firestore document:', error);
    //       }
    // };
    // console.log(firebase.auth().currentUser.uid);
    // dataReading(uuid);
    
    
    return(
        <div className = "page">
        <div className="pageTitle">
            Project
        </div>
        
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

       {/* <Link to = "/MyProfile">
        <img src = "Screenshot 2023-09-15 at 1.46 1.png" alt = "User choice" className="profilePicture"/>
        </Link>
        <div className="username">
            {username}
        </div> */}
        
        <div className="profilePicture">
        <Link to = "/MyProfile">
            <img alt = "User profile" src = {user.image} className='profilePhoto'/>
          </Link>
          <div className='username' >{user.userName}</div>
        </div>
        

        <div className = "right-side-panel"></div>
            <div className="calName">Mutual Calendar</div>
            <div style = {{overflowY: 'scroll', height:'150px'}} className="meeting-section">
            <Link to = '/ViewCalendar'>
            Team Meeting
            </Link>
            </div>
            <Link to = "/NewCalendar">
            <button className="newCalBTN">New Calendar</button>
            </Link>
        </div>
    );
}
export default ViewCalendar;