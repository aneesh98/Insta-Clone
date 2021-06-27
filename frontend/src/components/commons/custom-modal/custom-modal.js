import React from 'react';
import ReactDOM from 'react-dom';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './custom-modal.css';
const findByType = (children, component) => {
    const result = [];
    const type = [component.displayName || component.name];
    React.Children.forEach(children, (child) => {
        const childType =
            child && child.type && (child.type.displayName || child.type.name);
        if (type.includes(childType)) {
            result.push(child);
        }
    });
    return result[0];
};
const Header = () => null;
const Footer = () => null;
const Body = () => null;
class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.getElementById('root');
        this.state = {
            display: false,
        };
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
                {this.props.closable && (
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        onClick={() => this.closeModal()}
                    />
                )}
            </div>
        );
    }
    closeModal = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };
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
        const body = findByType(children, Body);
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
    componentDidMount() {
        this.setState({
            display: this.props.display,
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.display !== prevProps.display) {
            this.setState({
                display: this.props.display,
            });
        }
    }
    render() {
        // this.el.classList += ' overlay';
        return ReactDOM.createPortal(
            <CSSTransition
                in={this.state.display}
                unmountOnExit
                timeout={{ enter: 0, exit: 300 }}
            >
                <>
                    <div className="overlay">
                        <div
                            className={`loading-screen-container ${
                                this.state.display ? 'modal-show' : ''
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
