import React, { useRef, useState } from 'react';
import './feed-layout.css';
export default function FormButton(props) {
    const [file, setFile] = useState(null);
    const changeHandler = (e) => {
        setFile(e.target.files[0]);
    };
    const inputFileNode = useRef(null);
    const { type } = props;
    const onFileClick = () => {
        inputFileNode.current.click();
    };
    const Button = () => {
        if (type === 'upload') {
            return (
                <>
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => changeHandler(e)}
                        style={{
                            display: 'none',
                        }}
                        ref={inputFileNode}
                    />
                    <div
                        className="modal-body-custom upload-button"
                        onClick={() => onFileClick()}
                    >
                        {props.label}
                    </div>
                </>
            );
        } else {
            return (
                <div className="modal-body-custom cancel-button">
                    {props.label}
                </div>
            );
        }
    };
    return <Button />;
}
