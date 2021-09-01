import {useCreateStore, Provider} from '../lib/store';
import {AppProps} from 'next/app';
import '../main.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

export default function App({Component, pageProps}: AppProps) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  return (
    <Provider createStore={!!createStore ? createStore : pageProps.initialZustandState}>
      <Component {...pageProps} />
    </Provider>
  );
}
