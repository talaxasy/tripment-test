import {useCreateStore, Provider} from '../lib/store';
import {AppProps} from 'next/app';
import '../main.css';

export default function App({Component, pageProps}: AppProps) {
  const createStore = useCreateStore(pageProps.initialZustandState);
  return (
    <Provider createStore={!!createStore ? createStore : pageProps.initialZustandState}>
      <Component {...pageProps} />
    </Provider>
  );
}
