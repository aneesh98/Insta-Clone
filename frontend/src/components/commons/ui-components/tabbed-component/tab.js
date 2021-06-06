import React from 'react';
import './tabgroup.css';

export default function Tab(props) {
    const onClick = () => {
        const { tabId, onClick } = props;
        onClick(tabId);
    };
    const { activeTab, label, tabId } = props;
    let classname = 'tab-item';
    classname += activeTab === tabId ? ' tab-item-active' : '';
    return (
        <div className={classname} onClick={onClick}>
            {label}
        </div>
    );
}
