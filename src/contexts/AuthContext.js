import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        //clean function
        return () => {
            unsub();
        };
    }, []);

    console.log('current', currentUser);

    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
