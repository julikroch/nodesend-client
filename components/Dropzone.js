import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import Form from './Form'
import AppContext from '../context/app/appContext';
import AuthContext from '../context/auth/authContext';

const Dropzone = () => {

    const appContext = useContext(AppContext);
    const { loading, showAlert, uploadFile, createLink } = appContext;

    const authContext = useContext(AuthContext);
    const { user, authenticated } = authContext;

    const onDropRejected = () => {
        showAlert("Can't upload the file, limit is 1MB. Create an account to upload bigger files")
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0])
        uploadFile(formData, acceptedFiles[0].path);
    }, [])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

    const files = acceptedFiles.map(file => (
        <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{file.path}</p>
            <p className="text-sm text-gray-500">{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ))

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
            {acceptedFiles.length > 0 ? (
                <div className='mt-10 w-full'>
                    <h4 className="text-2xl font-bold text-center mb-4">Files:</h4>
                    <ul>
                        {files}
                    </ul>

                    {authenticated ? <Form /> : null}

                    {loading ? <p className="my-10 text-center text-gray-600">Uploading file...</p> : (
                        <button
                            type='button'
                            className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
                            onClick={() => createLink()}
                        >Create link</button>
                    )}
                </div>
            ) : (
                <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                    <input className="h-100" {...getInputProps()} />
                    {
                        isDragActive ? <p className="text-2xl text-center text-gray-600"> Drop it!</p> : (
                            <div className="text-center">
                                <p className="text-2xl text-center text-gray-600">Select a file and drop it here</p>
                                <button
                                    className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                                    type="button"
                                >Select file</button>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}

export default Dropzone;