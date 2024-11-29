import React, { useState, useEffect } from 'react';
import './Registration.css';
import firebase from '../config/firebase';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';

const Form = () => {
  const db = firebase.firestore();

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (registrationSuccess) {
      alert("Registration Successful");
    }
  }, [registrationSuccess]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error for the corresponding field
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newFormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newFormErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    setFormErrors(newFormErrors);
    return Object.keys(newFormErrors).length === 0; // Return true if there are no errors
  };

  const signUp = async () => {
    if (!validateForm()) {
      return; // Do not proceed with signup if there are validation errors
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);
      const userUid = userCredential.user.uid;

      const docRef = db.collection('users').doc(userUid);

      await docRef.set(formData);

      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error during registration: ', error);
      alert("Error Occurred");
      return; // Exit the function if an error occurs
    }

    // If we reach here, the registration was successful
    setRegistrationSuccess(true);
  };

  return (
    <>
      <h1>Registration Page</h1>
      <div className='form'>
        <div className='container'>
          <form>
            <div>
              <label htmlFor="id">Id:</label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="Enter Your ID"
                value={formData.id}
                onChange={handleInputChange}
              />
              {formErrors.id && <p style={{ color: 'red', fontSize: '13px' }}>{formErrors.id}</p>}
            </div>

            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {formErrors.firstName && <p style={{ color: 'red', fontSize: '13px' }}>{formErrors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {formErrors.lastName && <p style={{ color: 'red', fontSize: '13px' }}>{formErrors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && <p style={{ color: 'red', fontSize: '13px' }}>{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {formErrors.password && <p style={{ color: 'red', fontSize: '13px' }}>{formErrors.password}</p>}
            </div>

            <div>
              <button type="button" onClick={signUp}>Sign Up</button>
              <Link to="/">
                <button>Go Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
