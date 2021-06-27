import React, { Component } from 'react';
import './images-explorer-view.css';
import image from './icon-set.png';
import { CloseIcon } from '../ui-components/svgs/custom-icons';
export default class ImagesExplorerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }
    componentDidUpdate() {
        if (this.state.show) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }
    closeBox = () => {
        this.setState(
            { show: false }
            // () => (document.body.style.overflow = 'auto')
        );
    };
    render() {
        return this.state.show ? (
            <>
                <div className="overlay">
                    <div class="left-arrow" />
                    <article className="image-explorer-root">
                        <img src={image} width="60%" />
                    </article>
                    <div className="right-arrow" />
                    <div className="close-icon" onClick={this.closeBox}>
                        <CloseIcon />
                    </div>
                </div>
            </>
        ) : null;
    }
}
