import React from 'react';
import './tabgroup.css';
import Tab from './tab';
import { findByType } from '../../../utils/helpers';
class TabGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.children[0].props.tabId,
        };
    }
    onTabClick = (tab) => {
        this.setState({
            activeTab: tab,
        });
    };

    render() {
        const {
            onTabClick,
            props: { children },
            state: { activeTab },
        } = this;
        const tablist = findByType(children, Tab);
        return (
            <div className="tab-group">
                <div className="row-flex">
                    {tablist.map((tab) => (
                        <Tab
                            activeTab={activeTab}
                            label={tab.props.label}
                            onClick={onTabClick}
                            tabId={tab.props.tabId}
                        />
                    ))}
                </div>

                <div className="tab-content">
                    {tablist.map((tab) =>
                        activeTab === tab.props.tabId
                            ? tab.props.children
                            : undefined
                    )}
                </div>
            </div>
        );
    }
}
TabGroup.Tab = Tab;
export default TabGroup;
