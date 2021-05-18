//src/reducers/session_errors_reducer.js

import {
    RECECIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
} from '../actions/sessions_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECECIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return _nullErrors;
        default:
            return state;
    }
};

export default SessionErrorsReducer;