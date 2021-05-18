//src/reducers/errors_reducer.js

import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_reducer';

export default combineReducers({
    session: SessionErrorsReducer
});