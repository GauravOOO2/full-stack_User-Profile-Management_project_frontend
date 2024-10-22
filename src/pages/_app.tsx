import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../app/globals.css';
import Layout from '../app/layout';
import { AppProps } from 'next/app'; // Import AppProps type

const MyApp = ({ Component, pageProps }: AppProps) => { // Use AppProps for typing
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
