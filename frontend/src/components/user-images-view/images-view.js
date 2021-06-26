import React, { Component } from 'react';
import axiosInstance from '../commons/axiosApi';
import './images-view.css';
import sample1 from './sample-images/image_1.jpeg';
import sample2 from './sample-images/image_2.jpg';
import sample3 from './sample-images/image_3.jpeg';
import sample4 from './sample-images/image_4.jpeg';
export default class UserImagesView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.httpService = axiosInstance;
    }
    render() {
        return (
            <div className="image-explorer-container">
                {this.props.imagesList?.map((image_url) => (
                    <img src={image_url} height="250" width="250" />
                ))}
            </div>
        );
    }
}
