import React, { Component } from 'react';
import { useAuth } from '../../auth-context/auth';
import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function ProfileMenu(props) {
    let state = {};
    let auth = useAuth();
    let userProfileOptions = [
        {
            key: 'Adam',
            text: 'Adam',
            value: 'Adam',
            image: auth.user.profilePicture,
        },
    ];
    const CustomDropdownToggle = React.forwardRef(
        ({ children, onClick }, ref) => (
            <div>
                <img
                    src={auth.user.profilePicture}
                    width="25"
                    height="25"
                    style={{
                        borderRadius: '50%',
                    }}
                    ref={ref}
                    onClick={(e) => {
                        e.preventDefault();
                        onClick(e);
                    }}
                ></img>
                {children} &#x25bc;
            </div>
        )
    );
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle
                    as={CustomDropdownToggle}
                    id="dropdown-custom-1"
                ></Dropdown.Toggle>
                <Dropdown.Menu menuAlign="right">
                    <Dropdown.Item eventKey="1" onClick={() => auth.signout()}>
                        Logout
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        Something else here
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
