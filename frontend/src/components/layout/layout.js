import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import Login from '../loginform/LoginForm';
import RegistrationForm from '../registration/registration-form';
import SimpleFeed from '../feed/simple-feed-layout';
import ProtectedRoute from '../commons/protected-route/protected-route';
import { ProvideAuth } from '../commons/auth-context/auth';
export default function Layout() {
    return (
        <ProvideAuth>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <RegistrationForm />
                    </Route>
                    <ProtectedRoute path="/feed">
                        <SimpleFeed />
                    </ProtectedRoute>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}
