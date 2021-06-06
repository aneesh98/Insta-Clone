import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import {
    Link,
    useLocation,
    useRouteMatch,
    useHistory,
    Redirect,
} from 'react-router-dom';
import { Alert, Modal } from 'react-bootstrap';
import axiosInstance from '../commons/axiosApi';
import { useAuth } from '../commons/auth-context/auth';
import CustomModal from '../commons/custom-modal/custom-modal';
import axios from 'axios';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertShow, setAlertShow] = useState({
        registrationSuccess: false,
        failedLogin: false,
    });
    let location = useLocation();
    let auth = useAuth();
    console.log(auth);
    let history = useHistory();
    let httpService = axiosInstance;
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
            try {
                httpService
                    .post('/token/obtain', {
                        username: email,
                        password: password,
                    })
                    .then((response) => {
                        console.log(response);
                        httpService.defaults.headers['Authorization'] =
                            'JWT ' + response.data.access;
                        localStorage.setItem(
                            'access_token',
                            response.data.access
                        );
                        localStorage.setItem(
                            'refresh_token',
                            response.data.refresh
                        );
                        localStorage.setItem(
                            'username',
                            response.data.username
                        );
                        auth.signin(undefined, {
                            username: response.data.username,
                        });
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            setAlertShow({
                                ...alertShow,
                                failedLogin: true,
                            });
                        }
                    });
            } catch (error) {
                throw error;
            }
        }
    }
    const showAlertBox = (propName, status) => {
        setAlertShow({
            ...alertShow,
            [propName]: status,
        });
    };
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
				setAlertShow({
                    ...alertShow,
                    registrationSuccess: true
                });
				setTimeout(() => setAlertShow({
                    ...alertShow,
                    registrationSuccess: false
                }), 5000);
			}
    }, [location]);
    return auth.user.access_token ? (
        <Redirect
            to={{
                pathname: '/feed',
            }}
        />
    ) : (
        <React.Fragment>
            <CustomModal
                display={alertShow.failedLogin}
                title="Login Failed"
                onClose={() => showAlertBox('failedLogin', false)}
                closable
            >
                <CustomModal.Body>
                    Incorrect password or email. Please retry.
                </CustomModal.Body>
                <CustomModal.Footer>
                    <Button onClick={() => showAlertBox('failedLogin', false)}>
                        Retry
                    </Button>
                </CustomModal.Footer>
            </CustomModal>
            <Alert
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                }}
                variant={'success'}
                show={alertShow.registrationSuccess}
            >
                You've registered successfully! Login and explore...
            </Alert>
            <div className="Login Login-Box m-350">
                <h1 className="app-name">PhotoShare</h1>
                {/* <Alert variant={'success'}>You've registered successfully! Login and explore...</Alert> */}
                <Form>
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
                    <Button
                        className="button"
                        variant="primary"
                        onClick={handleSubmit}
                    >
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
