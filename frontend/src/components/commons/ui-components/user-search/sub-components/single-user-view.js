import React, {Component} from 'react';
import sample1 from '/home/aneesh/Desktop/SideProjects/clone-apps/instagram-clone/frontend/src/components/user-images-view/sample-images/image_1.jpeg';
import './single-user-view.css'
import { resolveResource } from '../../../../utils/helpers';

export default function SingleUserView(props) {
    return (
        <div>
            <div className='root-view'>
                <img src={resolveResource(props.src, 8000)} className='user-display'/>
                <div style={{
                        display:"flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        lineHeight: "1.1rem",
                        marginTop: "0.4rem"
                    }}>
                    <strong>{props.username}</strong>
                    <p className='user-name-text'>{props.name}</p>
                </div>
            </div>
        </div>
    )
}