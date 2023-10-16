import React, { Component } from 'react';
import { useRef, useState } from 'react';
import './MyProfile.css';
import { Link } from 'react-router-dom';

function MyProfile(){

  //const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const hiddenFileInput = useRef(null);
  const[profileName, setProfileName] = useState('Mr.Bean')//Default name for reference
  const[newProfileName, setNewProfileName] = useState('');



  const handleProfileNameChange = (event) =>{
    setNewProfileName(event.target.value);
  };
  const handleSaveName = () =>{
    console.log('Saving profile name', newProfileName);
    setProfileName(newProfileName);

    
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

    return (
      <div className='App'>
         <h1>
          My Profile
        </h1>
        <div className='homeButton'>
          <img src='./LOGO_BB_EU1024x1024_rond.png' alt='home button link'/>
        </div>
        <div className = "image-upload-container">
          <div className='box-decoration'>
          <label htmlFor='image-upload-input' className = "image-upload-label">
            {image ? image.name: "Choose an image"}
          </label>
          <div onClick = {handleImageClick} style = {{cursor: "pointer"}}>
          {image ? <img src = {URL.createObjectURL(image)} alt = "user update" className='img-display-after'/> : <img src = "./Screenshot 2023-09-15 at 1.46 1.png" alt = "default" className='img-display-before'/>}
        <input 
        id = "image-upload-input"
        type = "file" 
        ref = {hiddenFileInput} 
        onChange={handleImageChange}
        style = {{display : 'none'}}/>
        </div>
        <button className = "image-upload-button" onClick = {handleUploadButtonClick}>Upload</button>
        <div className='emailStyle'>Email: rBean89@ggc.edu</div><br></br>
        <div className='profile-Update-Container'>
        <div className='profile-Update-Name'> Profile Name:</div>
        <input defaultValue={profileName} type='text' className='profile-Update-Input' onChange={handleProfileNameChange}/>
          </div>
          <button className='saveButton' type='button' onClick={handleSaveName}>Save</button>
        </div>
        </div>
        <div className='website-logo'><img src='./5bd3ed4e0e1f7-1.png' alt='GGC Logo'/>
        <div className='titleStyle'>DataWise</div>
        <div>
          {image ?<img src = {URL.createObjectURL(image)} alt = "Curious" className='profile-picture-confirmer'/> : <img src = "./Screenshot 2023-09-15 at 1.46 1.png" alt = "Profile Live" className='profile-picture-confirmer'/> }
          
        </div>
        </div>
        
        <div className='confirmed-name' onChange={handleProfileNameChange}>{profileName}</div>
        <div className='border-divide'></div>
       

      </div>
    );
  
}

export default MyProfile;



