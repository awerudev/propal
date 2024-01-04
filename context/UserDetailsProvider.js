// UserDetailsProvider.js

import React, { useState, useEffect } from 'react';
import UserDetailsContext from './UserDetailsContext';
import { auth, db } from './firebase';
import { doc, getDoc } from "firebase/firestore";

export default function UserDetailsProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async authUser => {
            if (authUser) {
                const docRef = doc(db, 'users', authUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserDetails({
                        email: docSnap.get("email"),
                        height: docSnap.get("height"),
                        weight: docSnap.get("weight"),
                        age: docSnap.get("age"),
                        name: docSnap.get("name"),
                        lastName: docSnap.get("lastName"),
                    });
                } else {
                    console.log("No such document!");
                }
            }
        });

        return unsubscribe;
    }, []);

    return (
        <UserDetailsContext.Provider value={userDetails}>
            {children}
        </UserDetailsContext.Provider>
    );
}
