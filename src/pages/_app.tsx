import Axios from 'axios'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth';

export default function MyApp({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  return <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
}
