import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './registration.css';
import '../loginform/Login.css';
import axiosInstance from '../commons/axiosApi';
import LoadingScreen from '../commons/loading-screen/loading-screen';
import { Redirect } from 'react-router-dom';
export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.EMPTYMESSAGE = {
            username: 'Please enter a username.',
            email: 'Please enter an email address.',
            password: 'Please enter your password.',
            confirmPassword: 'Please confirm your password.',
        };
        this._axiosInstance = axiosInstance;
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            alertusername: '',
            alertemail: '',
            alertpassword: '',
            alertconfirmPassword: '',
            showLoad: false,
            redirectToLogin: false,
        };
    }
    componentDidMount() {}
    checkIfFormValid = () => {
        let alertMessage = {};
        let blankExists = false;
        for (let [propName, propValue] of Object.entries(this.state)) {
            if (['username', 'email', 'password', 'confirmPassword'].includes(propName)) {
                if (propValue === null || propValue === undefined || propValue === '') {
                    alertMessage['alert' + propName] = this.EMPTYMESSAGE[propName];
                    blankExists = true;
                } else {
                    alertMessage['alert' + propName] = '';
                }
            }
        }
        console.log(alertMessage);
        this.setState(alertMessage);
        console.log('Status of validation is ', blankExists);
        return !blankExists;
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.checkIfFormValid()) {
            this.setState({
                showLoad: true,
            });
            this._axiosInstance
                .post('/user/create', {
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                })
                .then((response) => {
                    setTimeout(
                        () =>
                            this.setState({
                                redirectToLogin: true,
                                showLoad: false,
                            }),
                        4000,
                    );
                });
        }
    };
    recordValue = (value, typeOfValue) => {
        this.setState({
            [typeOfValue]: value,
        });
    };
    componentWillUnmount() {
        this.setState({
            redirectToLogin: false,
        });
    }
    render() {
        if (this.state.redirectToLogin) {
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: {
                            displaySuccessAlert: true,
                        },
                    }}
                />
            );
        }
        return (
            <React.Fragment>
                <LoadingScreen display={this.state.showLoad} />

                <div className="form-container m-350">
                    <h1 className="app-name">Register</h1>
                    <hr class="line" />
                    <Form>
                        <Form.Group controlId="data">
                            <Form.Control
                                placeholder="Enter username..."
                                className="login-input thin-border"
                                onChange={(se) => this.recordValue(se.target.value, 'username')}
                            />
                            <Form.Control
                                placeholder="Enter email..."
                                type="email"
                                className="login-input thin-border"
                                onChange={(se) => this.recordValue(se.target.value, 'email')}
                            />
                            <Form.Control
                                placeholder="Enter password..."
                                type="password"
                                className="login-input thin-border"
                                onChange={(se) => this.recordValue(se.target.value, 'password')}
                            />
                            <Form.Control
                                placeholder="Confirm password..."
                                type="password"
                                className="login-input thin-border"
                                onChange={(se) =>
                                    this.recordValue(se.target.value, 'confirmPassword')
                                }
                            />
                        </Form.Group>
                        <Button
                            className="button"
                            variant="primary"
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                            Register
                        </Button>
                        {this.state.alertusername && (
                            <Alert
                                variant="warning"
                                style={{
                                    'margin-top': '10px',
                                }}
                            >
                                {this.state.alertusername}
                            </Alert>
                        )}
                        {this.state.alertemail && (
                            <Alert
                                variant="warning"
                                style={{
                                    'margin-top': '10px',
                                }}
                            >
                                {this.state.alertemail}
                            </Alert>
                        )}
                        {this.state.alertpassword && (
                            <Alert
                                variant="warning"
                                style={{
                                    'margin-top': '10px',
                                }}
                            >
                                {this.state.alertpassword}
                            </Alert>
                        )}
                        {this.state.alertconfirmPassword && (
                            <Alert
                                variant="warning"
                                style={{
                                    'margin-top': '10px',
                                }}
                            >
                                {this.state.alertconfirmPassword}
                            </Alert>
                        )}
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}
