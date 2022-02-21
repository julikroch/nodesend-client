import {
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    CLEAR_ALERTS,
    SHOW_ALERTS,
    CREATE_FILE_SUCCESS,
    CREATE_FILE_ERROR,
    CLEAR_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from '../../types';

const AppReducer = (state, action) => {
    switch (action.type) {
        case UPLOAD_FILE:
            return {
                ...state,
                loading: true
            }
        case UPLOAD_FILE_ERROR:
        case SHOW_ALERTS:
            return {
                ...state,
                file_msg: action.payload,
                loading: null
            }
        case CLEAR_ALERTS:
            return {
                file_msg: null
            }
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                loading: null
            }
        case CREATE_FILE_SUCCESS:
            return {
                ...state,
                url: action.payload
            }
        case CLEAR_STATE:
            return {
                ...state,
                file_msg: null,
                name: '',
                original_name: '',
                loading: null,
                download: 1,
                password: '',
                author: null,
                url: ''
            }
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOADS:
            return {
                ...state,
                download: action.payload
            }
        default:
            return state
    }
}

export default AppReducer