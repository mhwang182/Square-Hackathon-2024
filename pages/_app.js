import '../styles/global.css';
import Layout from '../Components/Layout'

export default function MyApp({ Component, pageProps }) {
  return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
  )
}