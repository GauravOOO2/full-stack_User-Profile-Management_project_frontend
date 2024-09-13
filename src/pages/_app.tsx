import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../app/globals.css';
import Layout from '../app/layout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
