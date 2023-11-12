import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from '../config/firebase'; // Import your firebase.js file

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to Firebase Authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // User is signed in
        try {
          const userDocRef = firebase.firestore().collection('users').doc(authUser.uid);
          const userDocSnapshot = await userDocRef.get();

          if (userDocSnapshot.exists) {
            const userData = userDocSnapshot.data();
            setUser({
              uid: authUser.uid,
              email: userData.emailAddress,
              firstName: userData.firstName,
              lastName: userData.lastName,
              userName: userData.userName,
              imageURL: userData.imageURL,
              id: userData.id,
            });
          } else {
            console.error('User not Found');
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }

        // Listen for changes in the user's document
        const userDocRef = firebase.firestore().collection('users').doc(authUser.uid);
        const unsubscribeUserData = userDocRef.onSnapshot((doc) => {
          const userData = doc.data();
          setUser((prevUser) => ({
            ...prevUser,
            imageURL: userData.imageURL,
            userName: userData.userName,
          }));
        });

        return () => {
          // Unsubscribe from the user data listener when the component unmounts
          unsubscribeUserData();
        };
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      // Unsubscribe from the authentication state changes when the component unmounts
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  if (user === null) {
    // Handle the case where the user is not authenticated or data is not yet available
  
  }
  return user;
}
