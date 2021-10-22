import axios from 'axios';
import { getCookie } from '../utils/helpers';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const url =
    window.location.protocol +
    '//' +
    window.location.hostname +
    '/insta_backend/';
console.log(url);
const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        const originalRequest = error.config;
        console.log(originalRequest);
        if (
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            console.log('Entered Dead Zone');
            const refresh_token = localStorage.getItem('refresh_token');
            const refreshAxiosInstance = axios.create({
                baseURL: 'http://192.168.0.108:8000/insta_backend/',
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    Authorization:
                        'JWT ' + localStorage.getItem('access_token'),
                },
            });
            return axiosInstance
                .post('/token/refresh', { refresh: refresh_token })
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem(
                        'refresh_token',
                        response.data.refresh
                    );

                    axiosInstance.defaults.headers['Authorization'] =
                        'JWT ' + response.data.access;
                    originalRequest.headers['Authorization'] =
                        'JWT ' + response.data.access;

                    return axiosInstance(originalRequest);
                })
                .catch((err) => {});
        }
        return Promise.reject(error);
    }
);
axiosInstance.POST_FORM_DATA = (url, formData) => {
    const headers = {
        'content-type': 'multipart/form-data',
    };
    return axiosInstance.post(url, formData, headers);
};
export default axiosInstance;
