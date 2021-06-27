import React, { Component, useEffect, useState } from 'react';
import { findByType } from '../../../utils/helpers';
import ExplorerObject from './explorer-object';
import './explorer-view.css';
import { CloseIcon } from '../svgs/custom-icons';

export default function ExplorerView(props) {
    const [activeTab, setActiveTab] = useState(null);
    useEffect(() => {
        setActiveTab(props.activeTab);
        if (props.activeTab !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [props.activeTab]);
    const { children } = props;
    let explorerObjects = findByType(children, ExplorerObject);
    const closeBox = () => {
        setActiveTab(null);
        if (props.onClose) {
            props.onClose();
        }
    };
    const arrowClick = (left) => {
        left
            ? setActiveTab(Math.max(activeTab - 1, 0))
            : setActiveTab(Math.min(activeTab + 1, explorerObjects.length - 1));
    };
    return activeTab !== null ? (
        <div className="overlay">
            {activeTab === 0 ? undefined : (
                <div class="left-arrow" onClick={() => arrowClick(true)} />
            )}
            {explorerObjects.map((object, id) =>
                object.props.objectId === activeTab ? (
                    <article className="explorer-root">
                        {object.props.children}
                    </article>
                ) : undefined
            )}
            {activeTab === explorerObjects.length - 1 ? undefined : (
                <div class="right-arrow" onClick={() => arrowClick(false)} />
            )}

            <div className="close-icon" onClick={closeBox}>
                <CloseIcon />
            </div>
        </div>
    ) : null;
}
ExplorerView.ExplorerObject = ExplorerObject;
