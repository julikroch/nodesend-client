import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/auth/authContext';

const Login = () => {

    const authContext = useContext(AuthContext);

    const { msg, authenticated, auth_loading, loginUser } = authContext;

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: values => {
            loginUser(values)
        }
    })

    useEffect(() => {
        if (authenticated) {
            router.push('/');
        }
    }, [authenticated])

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Log in</h2>
                {msg && <Alert />}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        {auth_loading ? (
                            <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 flex justify-center">
                                <Spinner />
                            </div>
                        ) : (
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-black text-sm font-bold mb-2"
                                    >Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none foucs:shadow-outline"
                                        placeholder="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{formik.errors.email}</p>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-black text-sm font-bold mb-2"
                                    >Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none foucs:shadow-outline"
                                        placeholder="Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{formik.errors.password}</p>
                                        </div>
                                    ) : null}
                                </div>
                                <input
                                    type="submit"
                                    className="bg-red-500 transition-all duration-300 ease-in-out hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                    value="login"
                                />
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;