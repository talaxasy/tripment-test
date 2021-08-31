import Page from '../components/page';
import {initializeStore} from '../lib/store';

export default function SSR() {
  return <Page />;
}

export function getServerSideProps() {
  const zustandStore = initializeStore();

  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
}
