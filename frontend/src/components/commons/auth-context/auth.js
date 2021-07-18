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
        postsCount: 0,
    });

    const signin = (cb, { username, userid, posts_count }) => {
        setUser({
            ...user,
            access_token: localStorage.getItem('access_token'),
            username: username,
            userid: userid,
            postsCount: posts_count,
        });
        if (cb) {
            cb();
        }
    };
    const signout = (cb) => {
        localStorage.removeItem('access_token');
        setUser({
            ...user,
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
    const setPostCount = (count) => {
        console.log('Triggered spc with value ', count);
        setUser({
            ...user,
            postsCount: count,
        });
    };
    const getPostCount = () => user.postsCount;
    return {
        user,
        signin,
        signout,
        setProfilePicture,
        setPostCount,
        getPostCount,
    };
}
