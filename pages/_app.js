import AuthContextProvider from '../context/auth/authState';
import AppContextProvider from '../context/app/appState';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthContextProvider>

  )
}

export default MyApp