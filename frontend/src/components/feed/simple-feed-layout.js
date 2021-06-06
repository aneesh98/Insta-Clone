import React, { Component } from 'react';
import './feed-layout.css';
import { useAuth } from '../commons/auth-context/auth';
import Navbar from '../commons/ui-components/navbar/navbar';
import TabGroup from '../commons/ui-components/tabbed-component/tabgroup';
import {
    PostIcon,
    SavedIcon,
    TaggedIcon,
} from '../commons/ui-components/svgs/custom-icons';
import dp from '../../user-files/profile-picture.jpeg';
export default function SimpleFeed(props) {
    let auth = useAuth();
    return (
        <div>
            <Navbar />
            <div className="feed-layout">
                <div className="profile-detail-display">
                    <img
                        src={dp}
                        alt="Profile Photo"
                        className="profile-picture"
                    />
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
                        <div>Tab1 Content</div>
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
        </div>
    );
}
