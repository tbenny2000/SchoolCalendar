import React from 'react';
import {useState, useEffect} from 'react';
import './NewCalendar.css';
import { Link } from 'react-router-dom';
import firebase from '../config/firebase';
import 'firebase/compat/firestore';
import { message } from 'antd';

const NewCalendar = () =>{
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [email, setEmailAddress] = useState('');
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const firestore = firebase.firestore();
  useEffect(() =>{
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        const uuid = user.uid;
        dataReading(uuid);
      }
    });

    return () => unregisterAuthObserver();
  }, []);

  const uuid = firebase.auth().currentUser.uid;

  const dataReading = async(userUID) => {
    try{
        const userReference = firestore.collection('users').doc(userUID);
        console.log(userUID);
        const userDoc = await userReference.get();
        if(userDoc.exists){
          console.log('Printing from userDoc: ', userDoc.data);
          const uName = userDoc.data().userName;
          const userID = userDoc.data().userID;
          const eAddress = userDoc.data().email;
          const img = userDoc.data().imageURL;

          setUserName(uName);
          setUserID(userID);
          setEmailAddress(eAddress);
          
          
        console.log(img)
        if (img == null){
          setImage('./Screenshot 2023-09-15 at 1.46 1.png')
        } else{
          setImage(img);
        }
        
        }else{
          console.log('User document not found.');
        }
    }catch (error){
      console.log('Error loading Firestore document:', error);
    }
  };
  const handleInputValueChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    //To reset error message and animation
    setErrorMessage('');
    setIsShaking(false);
  };
  const handleInputKeyDown = (e) =>{
    if(e.key === 'Enter'){
      handleInputValueChange(e);
        setErrorMessage('Please enter an actual email or username!')
        setIsShaking(true);

    }
  };
  const displayErrorMessage = (message) =>{
    setErrorMessage(message);
    setIsShaking(true);

    //The code to make it disappear after 5 second display
    setTimeout(() => {
      setErrorMessage('Please enter an actual email/username!');
      setIsShaking(false);
    }, 5000);
  };
  console.log(firebase.auth().currentUser.uid);
  dataReading(uuid);

  const calendarStyle = {
    width: '100%',
    height: '600px',
    border: '1px solid #A0A0A0',
  };

  const imageStyle = {
    width: '215px',
    height: '200px',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0.25)',
    borderRadius: '50%',
    border: '2px solid #DADADA',
    position: 'relative',
    top: '7px',
    left: '10px',
  };

  const nameStyle = {
    left: '50px',
    position: 'relative',
    margintop: '25px',
    color: '#7B7B7B',
    fontSize: '35px',
    fontFamily: 'Times New Roman, Times, Serif',
    fontWeight: '500',
    wordWrap: 'break-word',
  };

  const subjectStyle = {
    left: '450px',
    top: '95px',
    position: 'absolute',
    color: '#696969',
    fontSize: '45px',
    fontFamily: 'Inter',
    fontWeight: '700',
    wordWrap: 'break-word',
  };

  
  return(

    <div>
      <div className = 'calendar-list'>Mutual Calendar</div>
      <div className='right-side-panel'>
      </div>
      <Link to = "/NewCalendar">
      <button className='newcalendar-btn'>New Calendar</button>
      </Link>

        <Link to ='/homepage'>
          <img 
          src = "./BearLogo.png"
          className='Website-Logo'
          />
        </Link>
        <div className = 'title'>Datawise</div>
        <Link to = "/MyProfile">
        <img
          style={imageStyle}
          src= {image}
        />
        </Link>
        <div style={nameStyle}>{userName}</div>
        <div className='left-side-panel'> 
        
      </div>
        <div style={subjectStyle}> <input
        defaultValue={'Name of Calendar'}
        type = 'text'
        className='Calendar-title-input'
        >
        </input>
        <div className='addPeople'>
          Add to calendar:<input type='text' style={{fontSize : '35px', border : 'none', fontFamily : 'Times New Roman, Times, serif', color : 'grey', textDecoration : 'underline', background : 'transparent', outline : 'none'}}
          placeholder='Enter email or username'
          value = {inputValue}
          onChange={handleInputValueChange}
          onKeyDown={handleInputKeyDown}
          className = {isShaking ? 'shake' : ''}
          ></input>
          {errorMessage && <div className = "error-message">{errorMessage}</div>}

        </div>
        </div>
        <button className = "create-btn">
          Create
          </button>

       
  
    
      </div>
  );
}

//export default ViewCalendar;
export default NewCalendar;
