import axios from 'axios';
import { getCookie } from '../utils/helpers';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/insta_backend/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refresh_token = localStorage.getItem('refresh_token');
            const refreshAxiosInstance = axios.create({
                baseURL: 'http://127.0.0.1:8000/insta_backend/',
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
                .catch((err) => {
                    console.log(err);
                });
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
