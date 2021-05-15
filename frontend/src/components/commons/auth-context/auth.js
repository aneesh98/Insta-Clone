import React, { useState, useEffect, useContext, createContext } from 'react';

const authContext = createContext();
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => useContext(authContext);
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
        setUser(null);
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
