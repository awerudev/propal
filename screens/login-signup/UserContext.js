import React, {createContext, useContext, useState} from 'react';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        height: '',
        weight: '',
        age: '',
        name: '',
        lastName: '',
        gender: '',
        goal: ''
        // ... any other fields you want to save
    });

    const [userImages, setUserImages] = useState([]);

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails, userImages, setUserImages }}>
            {children}
        </UserContext.Provider>
    );
};
