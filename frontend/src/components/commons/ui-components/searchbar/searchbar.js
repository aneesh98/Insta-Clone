import React, { Component, useState, useRef, useEffect } from 'react';
import DialogBox from '../floating-dialog/dialog-box';
import './searchbar.css';

function useOutsideAlerter(ref, changeState) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                changeState(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}
export default function SearchBar(props) {
    const [dialog, setDialog] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setDialog);
    return (
        <div className="search-box" ref={wrapperRef}>
            <input
                type="text"
                placeholder="Search"
                onClick={() => setDialog(true)}
            ></input>
            {dialog && <DialogBox />}
        </div>
    );
}
