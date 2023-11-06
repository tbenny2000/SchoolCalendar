import React from 'react';
import { useRef, useState } from 'react';
import './MyProfile.css';
import { Link } from 'react-router-dom';
import firebase from '../config/firebase'; // Import your firebase.js file
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



function MyProfile(){

  //const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const hiddenFileInput = useRef(null);
  const[profileName, setProfileName] = useState('')//Default name for reference
  const[newProfileName, setNewProfileName] = useState('');
  
  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [userName, setUName] = useState('');
  const [userID, setUserID] = useState('');
  const [emailAddress, setEAddress] = useState('');

  const firestore = firebase.firestore();
  const uuid = firebase.auth().currentUser.uid

  const loadFirestoreDocument = async (userUid) => {
  
    try {
      const userRef = firestore.collection('users').doc(userUid);
      console.log(userUid);
      const userDoc = await userRef.get();
  
      if (userDoc.exists) {
        console.log('Printing from loadDoc: ',userDoc.data())
        const fName = userDoc.data().firstName;
        const lName = userDoc.data().lastName;
        const uName = userDoc.data().userName;
        const userID = userDoc.data().userID;
        const eAddress = userDoc.data().emailAddress;
        const img = userDoc.data().imageURL;
  
        setFName(fName);
        setLName(lName);
        setUName(uName);
        setUserID(userID);
        setEAddress(eAddress);
        setImage(img);

        if (img == null){
          setImage('./Screenshot 2023-09-15 at 1.46 1.png')
        } else{
          setImage(img);
        }

      } else {
        console.log('User document not found.');
      }
    } catch (error) {
      console.error('Error loading Firestore document:', error);
    }
    
  };
  console.log(firebase.auth().currentUser.uid)
  loadFirestoreDocument(uuid)

  //It's a function to save the name information to the database

  const handleProfileNameChange = (event) =>{
    setNewProfileName(event.target.value);
  };
  const handleSaveName = async () =>{

    console.log('Saving profile name', newProfileName);
    setProfileName(newProfileName);


    try {
      firestore.collection("users").doc(uuid).update({"userName": newProfileName})
      console.log(userName);
      console.log("Document successfully updated!");
    }
    catch (error) {
      console.error('Error updating Firestore document:', error);
    }
    
    setUName(newProfileName);

    
  };
  const handleImageClick = () =>{
    hiddenFileInput.current.click();
  };
  const handleImageChange = (event)=>{
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      const img = new Image();
      img.src = reader.result;
      img.onload = () =>{
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) /2,
          (maxSize - img.height)/2
        );
        canvas.toBlob(
          (blob) =>{
            const file = new File([blob], imgname,{
              type: "image/png",
              lastModified: Date.now(),
            });
            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
   
  };
  

  const handleUploadButtonClick = (file) => {
    var myHeaders = new Headers();
    const token = "fpdsigklopqq909045893126";
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", image);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
    .then((response) => response.text())
    .then((result) =>{
      console.log(JSON.parse(result));
      const profileurl = JSON.parse(result);
      setImage(profileurl.img_url);
    })
    .catch((error) => console.log("Oops, error", error));
  };


  //****************************************************************************************************************//


  // Create a root reference
    const storageRef = firebase.storage().ref();
    const db = firebase.firestore();
    
    function uploadImage() {
        const imageInput = document.getElementById('image-upload-input');
        const file = imageInput.files[0];
        const user = firebase.auth().currentUser;
    
        if (file && user) {
            const imageRef = storageRef.child(`userImages/${user.uid}/${file.name}`);
    
            imageRef.put(file).then((snapshot) => {
                // Image uploaded, get the download URL
                imageRef.getDownloadURL().then((url) => {
                    // Update the Firestore document for the user
                    const userDocRef = db.collection('users').doc(user.uid);
                    userDocRef.update({
                        imageURL: url
                    }).then(() => {
                        console.log('Image URL added to user document.');
                    }).catch((error) => {
                        console.error('Error updating Firestore document:', error);
                    });
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }).catch((error) => {
                console.error('Error uploading image:', error);
            });
        }
    }
  



  //***************************************************************************************************************//

    return (
      
      <div className='App'>
         <h1>
          My Profile
        </h1>
        <div className = "image-upload-container">
          <div className='box-decoration'>
          <label htmlFor='image-upload-input' className = "image-upload-label">
            {image ? image.name: "Choose an image"}
          </label>
          <div onClick = {handleImageClick} style = {{cursor: "pointer"}}>
          {image ? <img src = {image} alt = "user update" className='img-display-after'/> : <img src = "./Screenshot 2023-09-15 at 1.46 1.png" alt = "default" className='img-display-before' />}
        <input 
        id = "image-upload-input"
        type = "file" 
        ref = {hiddenFileInput} 
        onChange={handleImageChange}
        style = {{display : 'none'}}/>
        </div>
        <button className = "image-upload-button" onClick = {uploadImage}>Upload</button>
        <div className='emailStyle'>Email: {emailAddress}</div>
        <div className='profile-Update-Name'> 
        Profile Name:<input defaultValue={userName} type='text' onChange={handleProfileNameChange} style = {{border : 'none', outline : 'none', fontSize : '30px', fontWeight : '500', color : 'grey', textDecoration : 'underline', background : 'transparent'}}/>
        </div>
       
          <button className='saveButton' type='button' onClick={handleSaveName}>Save</button>
        </div>
        </div>
        <Link to = '/homepage'>
        <div className='website-logo'><img src='./BearLogo.png' alt='GGC Logo'/> 
        <div className='titleStyle'>DataWise</div>
        </div>
        </Link>
        <div>
          <img src = {image} alt = "Curious" className='profile-picture-confirmer'/> : <img src = {image} alt = "Profile Live" className='profile-picture-confirmer'/>
          <div  id ="profName" className='confirmed-name' onChange={handleProfileNameChange}>{userName}</div>
        </div>
        
        <div className='border-divide'></div>
       

      </div>
    );
  
}

export default MyProfile;



