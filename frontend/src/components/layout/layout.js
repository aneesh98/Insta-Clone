import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import Login from '../loginform/LoginForm';
import RegistrationForm from '../registration/registration-form';
export default function Layout() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/register">
					<RegistrationForm />
				</Route>
			</Switch>
		</Router>
	);
}
