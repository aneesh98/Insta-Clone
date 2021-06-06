import React from 'react';
import '../../../loginform/Login.css';
import DialogBox from '../floating-dialog/dialog-box';
import SearchBar from '../searchbar/searchbar';
import { ChatIcon, HomeIcon, NotificationIcon } from '../svgs/custom-icons';
import './navbar.css';
export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationDialog: false,
        };
    }
    showNotificationDialog = () => {
        this.setState((state) => ({
            notificationDialog: !state.notificationDialog,
        }));
    };
    render() {
        return (
            <div className="navbar">
                <h3 className="app-name">PhotoShare</h3>
                <SearchBar />
                <div className="iconset">
                    <div className="nav-item">
                        <HomeIcon />
                    </div>
                    <div className="nav-item">
                        <ChatIcon number={5} />
                    </div>
                    <div className="nav-item">
                        <NotificationIcon number={5} />
                    </div>
                </div>
            </div>
        );
    }
}
