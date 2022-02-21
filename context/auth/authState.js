import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clearAlerts from '../../helpers/clearAlerts';
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
import Axios from '../../config/axios';
import authToken from '../../config/auth';

const AuthContextProvider = ({ children }) => {

    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('reactnodesendtoken') : null,
        authenticated: null,
        user: null,
        msg: null,
        auth_loading: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registerUser = async (data) => {

        dispatch({
            type: REGISTRATION
        })

        try {
            const response = await Axios.post('/api/users', data);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data.msg
            })
        } catch (error) {
            dispatch({
                type: ERROR_REGISTRATION,
                payload: error.response.data.msg
            })
        }

        clearAlerts(dispatch, CLEAR_ALERTS);
    }

    const loginUser = async data => {

        dispatch({
            type: LOGIN
        })

        try {
            const response = await Axios.post('/api/auth', data);
            console.log(response)
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data.token
            })
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN,
                payload: error.response.data.msg
            })
        }

        clearAlerts(dispatch, CLEAR_ALERTS);
    }

    const userAuthenticated = async () => {
        const token = localStorage.getItem('reactnodesendtoken');
        if (token) {
            authToken(token);
        }

        try {
            const response = await Axios.get('/api/auth');
            if (response.data.user) {
                dispatch({
                    type: USER_AUTHENTICATED,
                    payload: response.data.user
                })
            }
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN,
                payload: error.response.data.msg
            })
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                msg: state.msg,
                auth_loading: state.auth_loading,
                registerUser,
                loginUser,
                userAuthenticated,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider