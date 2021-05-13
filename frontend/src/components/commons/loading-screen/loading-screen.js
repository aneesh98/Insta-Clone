import React from 'react';
import ReactDOM from 'react-dom';
import { Spinner } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './loading-screen.css';
export default class LoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.getElementById('root');
		this.state = {};
	}
	componentWillUnmount() {}
	render() {
		// this.el.classList += ' overlay';
		return ReactDOM.createPortal(
			<CSSTransition in={this.props.display} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
				<div className="overlay">
					<div className={`loading-screen-container ${this.props.display ? 'modal-show' : ''}`}>
						<div className="vertical-flex-container m-10">
							<Spinner animation="border" role="status" />
							<p>Please Wait...</p>
						</div>
					</div>
				</div>
			</CSSTransition>,
			document.getElementById('root')
		);
	}
}
