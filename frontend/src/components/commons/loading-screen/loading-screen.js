import React from 'react';
import ReactDOM from 'react-dom';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './loading-screen.css';
const findByType = (children, component) => {
    const result = [];
    console.log('findByType: component details ', component.name);
    console.log('findByType: children details ', children);
    const type = [component.displayName || component.name];
    console.log('findByType: type details ', type);
    React.Children.forEach(children, (child) => {
        console.log('findByType: child details', child.type.name);
        const childType =
            child && child.type && (child.type.displayName || child.type.name);
        if (type.includes(childType)) {
            result.push(child);
        }
    });
    console.log('findByType: result details ', result);
    return result[0];
};
const Header = () => null;
const Footer = () => null;
const Body = () => null;
class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.getElementById('root');
        this.state = {};
    }
    componentWillUnmount() {}
    operateChildren = (children) => {
        React.Children.forEach(children, (child) => {
            console.log(child, child.name, child.displayName, child.type);
        });
    };
    renderHeader() {
        if (!this.props.title) {
            return null;
        }
        return (
            <div className="d-flex-horizontal modal-header">
                {this.props.title}
                <FontAwesomeIcon icon={faTimesCircle} />
            </div>
        );
    }
    renderFooter() {
        const { children } = this.props;
        const footer = findByType(children, Footer);
        if (!footer) {
            return null;
        }
        return (
            <div className="d-flex-horizontal modal-footer">
                {footer.props.children}
            </div>
        );
    }
    renderBody() {
        const { children } = this.props;
        console.log(children);
        const body = findByType(children, Body);
        console.log(body);
        if (!body) {
            return null;
        }
        return (
            <div
                style={{
                    padding: '10px',
                }}
            >
                {body.props.children}
            </div>
        );
    }
    render() {
        // this.el.classList += ' overlay';
        return ReactDOM.createPortal(
            <CSSTransition
                in={this.props.display}
                unmountOnExit
                timeout={{ enter: 0, exit: 300 }}
            >
                <>
                    <div className="overlay">
                        <div
                            className={`loading-screen-container ${
                                this.props.display ? 'modal-show' : ''
                            }`}
                        >
                            <div className="d-flex-vertical vertical-flex-container m-10">
                                {this.renderHeader()}
                                {this.renderBody()}
                                {this.renderFooter()}
                            </div>
                        </div>
                    </div>
                </>
            </CSSTransition>,
            document.getElementById('root')
        );
    }
}
CustomModal.Header = Header;
CustomModal.Body = Body;
CustomModal.Footer = Footer;
export default CustomModal;
