import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Alert from '../components/Alert';
import Dropzone from '../components/Dropzone';
import AuthContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';
import Link from 'next/link';

const Index = () => {

  const authContext = useContext(AuthContext);
  const { userAuthenticated } = authContext;

  const appContext = useContext(AppContext);
  const { file_msg, url } = appContext;

  useEffect(() => {
    const token = localStorage.getItem('reactnodesendtoken')
    userAuthenticated();
  }, [])

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl mt-10">
              <span className="font-bold text-red-700 text-4xl">Your URL is:</span> {`${process.env.frontendURL}/links/${url}`}
            </p>
            <button
              type="button"
              className="bg-red-500 transition-all duration-300 ease-in-out hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
              onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
            >Copy link</button>
          </>
        ) : (
          <div>
            {file_msg && <Alert />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Share your files!</h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">N&N</span> allows you to share files encrypted end to end
                </p>
                <Link href='/newaccount'>
                  <a className="text-red-500 font-bold text-md hover:text-red-700">Create an account and get access to a lot of benefits!</a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Index;