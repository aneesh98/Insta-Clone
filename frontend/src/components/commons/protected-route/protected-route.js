import React, { Component, Children } from 'react';
import { Route } from 'react-router';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../auth-context/auth';

export default function ProtectedRoute({ children, ...rest }) {
    const auth = useAuth();
    let location = useLocation();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return auth.user.access_token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {
                                from: location,
                            },
                        }}
                    />
                );
            }}
        />
    );
}
