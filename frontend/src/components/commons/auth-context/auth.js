import React, { useState, useEffect, useContext, createContext } from 'react';

const authContext = createContext();
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => useContext(authContext);
//This is a custom hook
function useProvideAuth() {
    const [user, setUser] = useState({
        access_token: localStorage.getItem('access_token'),
        username: null,
    });

    const signin = (cb, { username }) => {
        setUser({
            access_token: localStorage.getItem('access_token'),
            username: username,
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
    return {
        user,
        signin,
        signout,
    };
}
