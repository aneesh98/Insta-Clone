import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import { Link, useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

export default function Login(props) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ alertShow, setAlertShow ] = useState(false);
	let location = useLocation();
	let history = useHistory();
	console.log(location);
	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
	}
	useEffect(
		() => {
			window.history.replaceState({
				key:"",
				state: {}
			}, '')
			if (location.state?.displaySuccessAlert && location.state?.sampleProp) {
				setAlertShow(true);
				setTimeout(() => setAlertShow(false), 5000);
			}
		},
		[ location ]
	);
	return (
		<React.Fragment>
			<Alert
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%'
				}}
				variant={'success'}
				show={alertShow}
			>
				You've registered successfully! Login and explore...
			</Alert>
			<div className="Login Login-Box m-350">
				<h1 className="app-name">PhotoShare</h1>
				{/* <Alert variant={'success'}>You've registered successfully! Login and explore...</Alert> */}
				<Form onClick={handleSubmit}>
					<Form.Group controlId="formBasicEmail">
						<br />
						<Form.Control type="email" placeholder="Enter email..." className="login-input thin-border" />
						<br />
						<Form.Control
							type="password"
							placeholder="Enter password..."
							className="login-input thin-border"
						/>
					</Form.Group>
					<Button className="button" variant="primary" type="submit">
						Log In
					</Button>
				</Form>
			</div>
			<div className="Login-Box Bottom-Box">
				Don't have an account? <Link to="/register">Register</Link>
			</div>
		</React.Fragment>
	);
}
