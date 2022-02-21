import React, { useState, useContext } from 'react';
import AppContext from '../context/app/appContext';

const Form = () => {

    const [hasPassword, setHasPassword] = useState(false);

    const appContext = useContext(AppContext);
    const { addPassword, addDownloads } = appContext;

    return (
        <div className="w-full mt-20">
            <div>
                <label htmlFor="downloads" className="text-lg text-gray-800">Delete after:</label>
                <select
                    defaultValue="0"
                    name="downloads"
                    id="downloads"
                    onChange={e => addDownloads(parseInt(e.target.value))}
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                >
                    <option value="0" disabled>-- Select --</option>
                    <option value="1">1 download</option>
                    <option value="5">5 download</option>
                    <option value="10">10 download</option>
                    <option value="20">20 download</option>
                </select>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="downloads" className="text-lg text-gray-800 mr-2">Password:</label>
                    <input
                        type="checkbox"
                        onChange={() => setHasPassword(!hasPassword)}
                    />
                </div>
                {hasPassword ? (
                    <input
                        type="password"
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                        onChange={e => addPassword(e.target.value)}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default Form;