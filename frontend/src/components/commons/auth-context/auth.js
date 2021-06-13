import React, { useState, useEffect, useContext, createContext } from 'react';

const authContext = createContext();
export function UserContext({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => useContext(authContext);
//This is a custom hook
function useProvideAuth() {
    const [user, setUser] = useState({
        access_token: localStorage.getItem('access_token'),
        username: localStorage.getItem('username') || null,
        userid: localStorage.getItem('userid') || null,
        profilePicture: null,
    });

    const signin = (cb, { username, userid }) => {
        setUser({
            access_token: localStorage.getItem('access_token'),
            username: username,
            userid: userid,
        });
        if (cb) {
            cb();
        }
    };
    const signout = (cb) => {
        localStorage.removeItem('access_token');
        setUser({
            access_token: null,
            username: null,
        });
        if (cb) {
            cb();
        }
    };
    const setProfilePicture = (photoObj) => {
        setUser({
            ...user,
            profilePicture: photoObj,
        });
    };
    return {
        user,
        signin,
        signout,
        setProfilePicture,
    };
}
