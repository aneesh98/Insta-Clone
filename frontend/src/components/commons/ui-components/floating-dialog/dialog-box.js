import React, { useState, useRef, useEffect } from 'react';
import {Overlay, Popover} from 'react-bootstrap';
import './dialog-box.css';
export default function OverlayBox(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    useEffect(() => {setShow(props.show)}, [props.show])
    const handleClick = (event) => {
        console.log(ref.current);
        setShow(true);
        setTarget(event.target);
    };

    return (
        <div ref={ref} style={{position:"relative"}}>
            <div onClick={handleClick}> 
                {props.children}
            </div>
            {props.show ?
                <Overlay
                    show={show}   
                    target={target}         
                    placement='bottom'
                    container={ref.current}
                    containerPadding={20}
                >
                    <Popover id='popover-bottom'
                        style={{...props.popoverStyle}}
                    >
                            <Popover.Content>
                                {props.render()}
                            </Popover.Content>
                    </Popover>
                </Overlay> : null
            }
        </div>
    );
}
