import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import { Link, useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axiosInstance from '../commons/axiosApi';
import axios from 'axios';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    let location = useLocation();
    let history = useHistory();
    let httpService = axiosInstance;
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = httpService.post('/token/obtain', {
                    email: email,
                    password: password,
                });
                httpService.defaults.headers['Authorization'] =
                    'JWT ' + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }
    useEffect(() => {
        window.history.replaceState(
            {
                key: '',
                state: {},
            },
            ''
        );
        // prettier-ignore
        if (location.state?.displaySuccessAlert) {
				setAlertShow(true);
				setTimeout(() => setAlertShow(false), 5000);
			}
    }, [location]);
    return (
        <React.Fragment>
            <Alert
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
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
                        <Form.Control
                            type="email"
                            placeholder="Enter email..."
                            className="login-input thin-border"
                            onChange={(inp) => setEmail(inp.target.value)}
                        />
                        <br />
                        <Form.Control
                            type="password"
                            placeholder="Enter password..."
                            className="login-input thin-border"
                            onChange={(inp) => setPassword(inp.target.value)}
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
