//frontend/src/util/session_api_util.js

import axios from 'axios';

export const setAuthtoken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'];
    } else {
        axios.defaults.headers.common['Authorization'];
    }
};