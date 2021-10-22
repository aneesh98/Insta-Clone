import React, { Component } from 'react';
import axiosInstance from '../../axiosApi';
import SingleUserView from './sub-components/single-user-view';
import './user-search.css';

export default class UserSearch extends Component {
    state = {
        recentSearches: [],
        searchKey: "",
        userList: []
    }
    searchUsers = (searchKey) => {
        const httpService = axiosInstance.get("/search/"+searchKey).then(({data}) => {
            this.setState({userList: data})
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchKey !== this.props.searchKey) {
            this.setState({
                searchKey: this.props.searchKey
            }, () => this.searchUsers(this.state.searchKey));
        }
    }
    render() {
        return (
        <div style={{padding:"0"}}>
            <div className='head'>
                <h5>Recent</h5>
                {this.state.recentSearches.length > 0 && <h6>Clear All</h6>}
            </div>
            {/* {(this.state.recentSearches.length == 0 && !this.state.searchKey) && 
                <p>No Recent Searches</p>} */}
            {   this.state.userList.length > 0 &&
                <div className='container'>
                    <ul className='no-bullets'>
                        {this.state.userList.map(item => {
                            return (
                            <li>
                                <SingleUserView src={item.profile_photo} username={item.username}
                                    name={item.first_name + " " + item.last_name}
                                />
                            </li>
                            )
                        })}
                    </ul>
                </div>}
        </div>
        )
    }
}