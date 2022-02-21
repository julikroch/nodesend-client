import { useState, useContext } from 'react';
import Layout from '../../components/Layout';
import Alert from '../../components/Alert';
import AppContext from '../../context/app/appContext';
import Axios from '../../config/axios';

export async function getServerSideProps({ params }) {
    const { link } = params;
    const result = await Axios.get(`/api/links/${link}`);

    return {
        props: {
            link: result.data
        }
    }
};

export async function getServerSidePaths() {
    const links = await Axios.get('/api/links');
    return {
        paths: links.data.links.map(link => ({
            params: { link: link.url }
        })),
        fallback: false
    }
};

const Link = ({ link }) => {

    const appContext = useContext(AppContext);
    const { file_msg, showAlert } = appContext;

    const [hasPassword, setHasPassword] = useState(link.password);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')

    const verifyPassword = async e => {
        e.preventDefault();
        const data = { password }
        try {
            const result = await Axios.post(`/api/links/${link.link}`, data)
            setHasPassword(result.data.password)
        } catch (error) {
            showAlert(error.response.data.msg)
        }
    }

    return (
        <Layout>
            {hasPassword ? (
                <>
                    <p className="text-center">This link is protected with a password:</p>
                    {file_msg && <Alert />}
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={e => verifyPassword(e)}
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-black text-sm font-bold mb-2"
                                    >Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none foucs:shadow-outline"
                                        placeholder="Password..."
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="show" className="text-lg text-gray-800 mr-2">Show password:</label>
                                    <input
                                        type="checkbox"
                                        onChange={() => setShowPassword(!showPassword)}
                                        name="show"
                                        id="show"
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="bg-red-500 transition-all duration-300 ease-in-out hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                    value="Validate password"
                                />
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl text-center text-gray-700">Download file</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a
                            href={`${process.env.backendURL}/api/files/${link.file}`}
                            className="bg-red-500 text-center px-10 -py-3 rounded uppercase font-bold text-white cursor-pointer"
                            download
                        >Here</a>
                    </div>
                </>
            )}
        </Layout>
    );
}

export default Link;