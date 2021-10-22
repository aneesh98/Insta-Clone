import React, { Component, useState, useRef, useEffect } from 'react';
import OverlayBox from '../floating-dialog/dialog-box';
import UserSearch from '../user-search/user-search';
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
    const [searchVal, setSearchVal] = useState('');
    const placeholder = 'Search';
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setDialog);
    return (
        <div ref={wrapperRef}>
            <OverlayBox
                show={dialog}
                popoverProps={{
                    title: 'Recent Searches',
                    placeholder: 'No Recent Searches',
                }}
                popoverStyle={{
                    position: 'absolute',
                    width: '30vw',
                    marginLeft: '-30px',
                    maxWidth: '40vw',
                    maxHeight: '50vh',
                    height: '50vh',
                    boxShadow: '0 2px 5px 1px rgba(0, 0, 0, .0975)',
                }}
                render={() => <UserSearch searchKey={searchVal} />}
            >
                <div className="search-box">
                    <input
                        type="text"
                        placeholder={placeholder}
                        onClick={() => setDialog(true)}
                        value={searchVal}
                        onChange={(event) => setSearchVal(event.target.value)}
                    ></input>
                </div>
            </OverlayBox>
        </div>
    );
}
