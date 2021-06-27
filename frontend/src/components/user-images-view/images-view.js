import React, { Component } from 'react';
import axiosInstance from '../commons/axiosApi';
import ImagesExplorerView from '../commons/images-explorer/images-explorer-view';
import ExplorerView from '../commons/ui-components/explorer-view/explorer-view';
import './images-view.css';
import sample1 from './sample-images/image_1.jpeg';
import sample2 from './sample-images/image_2.jpg';
import sample3 from './sample-images/image_3.jpeg';
import sample4 from './sample-images/image_4.jpeg';
export default class UserImagesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeImageTab: null,
        };
        this.httpService = axiosInstance;
    }
    changeActiveTab = (index) => {
        this.setState({ activeImageTab: index });
    };
    closeExplorer = () => {
        this.setState({ activeImageTab: null });
    };
    render() {
        return (
            <>
                <div className="image-explorer-container">
                    {this.props.imagesList?.map((image_url, index) => (
                        <div onClick={() => this.changeActiveTab(index)}>
                            <img src={image_url} height="250" width="250" />
                        </div>
                    ))}
                    {
                        <ExplorerView
                            activeTab={this.state.activeImageTab}
                            onClose={this.closeExplorer}
                        >
                            {this.props.imagesList?.map((image_url, index) => (
                                <ExplorerView.ExplorerObject objectId={index}>
                                    <img src={image_url} width="60%" />
                                </ExplorerView.ExplorerObject>
                            ))}
                        </ExplorerView>
                    }
                </div>
            </>
        );
    }
}
