import React, { Component, useEffect, useState } from 'react';
import './feed-layout.css';
import { useAuth } from '../commons/auth-context/auth';
import Navbar from '../commons/ui-components/navbar/navbar';
import TabGroup from '../commons/ui-components/tabbed-component/tabgroup';
import {
    PostIcon,
    SavedIcon,
    SettingsIcon,
    TaggedIcon,
} from '../commons/ui-components/svgs/custom-icons';
import { Button, Modal, Spinner } from 'react-bootstrap';
import dp from '../../user-files/profile-picture.jpeg';
import FormButton from './modal-button';
import axiosInstance from '../commons/axiosApi';
import { getCookie } from '../utils/helpers';
import AddButton from '../commons/ui-components/add-button/add-button';
import UserImagesView from '../user-images-view/images-view';

export default function SimpleFeed(props) {
    let auth = useAuth();
    let [modal, showModal] = useState(false);
    let [userImagesList, setUserImagesList] = useState([]);
    useEffect(() => {
        getProfilePictureUrl();
        getUserUploadedImages();
    }, []);

    const httpService = axiosInstance;
    const getProfilePictureUrl = () => {
        httpService.get('/getdp/' + auth.user.userid + '/').then((response) => {
            auth.setProfilePicture(
                'http://localhost:8000/insta_backend' +
                    response.data.profile_photo
            );
        });
    };
    const uploadFile = (fileObj) => {
        auth.setProfilePicture(null);
        const userId = localStorage.getItem('userid');
        let formData = new FormData();
        formData.append('user_id', userId);
        formData.append('profile_photo', fileObj);
        httpService.POST_FORM_DATA('/setdp/', formData).then(() => {
            getProfilePictureUrl();
            showModal(false);
        });
    };
    const uploadImage = (fileObj) => {
        const userId = localStorage.getItem('userid');
        let formData = new FormData();
        formData.append('user_id', userId);
        formData.append('image', fileObj);
        httpService.POST_FORM_DATA('/upload_image/', formData, () => {});
    };
    const getUserUploadedImages = () => {
        const userId = localStorage.getItem('userid');
        httpService.get('/user_images/' + userId).then((response) => {
            let imagesList = response.data.map((item) => item['image']);
            setUserImagesList(imagesList);
        });
    };
    return (
        <div>
            <Navbar />
            <div className="feed-layout">
                <div className="profile-detail-display">
                    <div onClick={() => showModal(!modal)}>
                        {auth.user.profilePicture !== null ? (
                            <img
                                src={auth.user.profilePicture}
                                alt="Profile Photo"
                                className="profile-picture"
                            />
                        ) : (
                            <div className="profile-picture">
                                <Spinner animation="border" />
                            </div>
                        )}
                    </div>
                    <div className="detail-box">
                        <div className="d-flex flex-row profile-detail-display-row">
                            <h3 className="detail-row padding">
                                {auth.user.username}
                            </h3>
                            <Button
                                size="sm"
                                className="button-variant-1 detail-row"
                            >
                                Edit Profile
                            </Button>
                            <div className="detail-row margin-1">
                                <SettingsIcon />
                            </div>
                        </div>
                        <div className="d-flex flex-row profile-detail-display-row">
                            <h3 className="detail-row padding sub-detail">
                                <span className="fw-600">0</span> posts
                            </h3>
                            <h3 className="detail-row padding sub-detail">
                                <span className="fw-600">0</span> followers
                            </h3>
                            <h3 className="detail-row padding sub-detail">
                                <span className="fw-600">0</span> following
                            </h3>
                        </div>
                    </div>
                </div>
                <TabGroup>
                    <TabGroup.Tab
                        label={
                            <span>
                                <PostIcon />
                                <span className="tab-item-style">POSTS</span>
                            </span>
                        }
                        tabId="1"
                    >
                        <div>
                            <div
                            // style={{
                            //     position: 'relative',
                            //     top: '50px',
                            //     left: '40%',
                            // }}
                            >
                                <FormButton
                                    label={
                                        <Button variant="secondary">
                                            Upload Photo
                                        </Button>
                                    }
                                    onUpload={uploadImage}
                                    type="upload"
                                />
                            </div>
                            <div>
                                <UserImagesView imagesList={userImagesList} />
                            </div>
                        </div>
                    </TabGroup.Tab>
                    <TabGroup.Tab
                        label={
                            <span>
                                <SavedIcon />
                                <span className="tab-item-style">SAVED</span>
                            </span>
                        }
                        tabId="2"
                    >
                        <div>Tab2 Content</div>
                    </TabGroup.Tab>
                    <TabGroup.Tab
                        label={
                            <span>
                                <TaggedIcon />
                                <span className="tab-item-style">TAGGED</span>
                            </span>
                        }
                        tabId="3"
                    >
                        <div>Tab3 Content</div>
                    </TabGroup.Tab>
                </TabGroup>
            </div>
            {/* <Button onClick={() => auth.signout()}>Logout</Button> */}
            {
                <Modal
                    // fullscreen="sm-down"
                    show={modal}
                    onHide={() => showModal(false)}
                    dialogClassName="modal-custom"
                >
                    <Modal.Header closeButton className="modal-header-custom">
                        <Modal.Title className="t-center">
                            Change Profile Photo
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormButton
                            label="Upload Photo"
                            type="upload"
                            onUpload={uploadFile}
                        />
                        <div className="modal-body-custom cancel-button">
                            Remove Current Photo
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}
