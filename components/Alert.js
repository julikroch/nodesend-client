import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';

const Alert = () => {

    const authContext = useContext(AuthContext);
    const { msg } = authContext;

    const appContext = useContext(AppContext);
    const { file_msg } = appContext;

    return (
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
            {msg || file_msg}
        </div>
    );
}

export default Alert;