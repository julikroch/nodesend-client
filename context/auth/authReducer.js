import {
    REGISTRATION,
    LOGIN,
    SUCCESSFUL_REGISTRATION,
    ERROR_REGISTRATION,
    CLEAR_ALERTS,
    USER_AUTHENTICATED,
    SUCCESSFUL_LOGIN,
    ERROR_LOGIN,
    LOG_OUT
} from '../../types';

const AuthReducer = (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_REGISTRATION:
        case ERROR_REGISTRATION:
        case ERROR_LOGIN:
            return {
                ...state,
                msg: action.payload,
                auth_loading: null
            }
        case REGISTRATION:
        case LOGIN:
            return {
                ...state,
                auth_loading: true
            }
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('reactnodesendtoken', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true,
                auth_loading: null
            }
        case USER_AUTHENTICATED:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case LOG_OUT:
            localStorage.removeItem('reactnodesendtoken')
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null
            }
        case CLEAR_ALERTS:
            return {
                ...state,
                msg: null
            }
        default:
            return state
    }
}

export default AuthReducer