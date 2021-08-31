import {useStore} from '../lib/store';
import shallow from 'zustand/shallow';

const Counter = () => {
  const {count, increment, decrement, reset} = useStore(
    store => ({
      count: store.count,
      increment: store.increment,
      decrement: store.decrement,
      reset: store.reset,
    }),
    shallow,
  );
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
