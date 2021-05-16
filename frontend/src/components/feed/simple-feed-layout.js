import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../commons/auth-context/auth';
export default function SimpleFeed(props) {
    let auth = useAuth();
    console.log(auth);
    return (
        <>
            <h1> Welcome to PhotoShare {auth.user.username}</h1>
            <Button onClick={() => auth.signout()}>Logout</Button>
        </>
    );
}
