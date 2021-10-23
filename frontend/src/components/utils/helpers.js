import React from 'react';

export const findByType = (children, component) => {
    const result = [];
    const type = [component.displayName || component.name];
    React.Children.forEach(children, (child) => {
        const childType =
            child && child.type && (child.type.displayName || child.type.name);
        if (type.includes(childType)) {
            result.push(child);
        }
    });
    return result;
};

export const resolveResource = (endpoint, port) => {
    const portNo = port ? ':' + port : '';
    return (
        window.location.protocol +
        '//' +
        window.location.hostname +
        portNo +
        '/insta_backend' +
        endpoint
    );
};

export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + '=') {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
};
