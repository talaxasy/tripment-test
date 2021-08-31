import {useLayoutEffect} from 'react';
import create from 'zustand';
import createContext, {UseContextStore} from 'zustand/context';

const zustandContext = createContext();
export const Provider = zustandContext.Provider;
export const useStore: UseContextStore<typeof initialState> = zustandContext.useStore;

let store: import('zustand/index').UseStore<typeof initialState> | null = null;

type InitialStateTypes = {
  count: number;
  increment?: () => void;
  decrement?: () => void;
  reset?: () => void;
};

const initialState: InitialStateTypes = {
  count: 0,
};

export const initializeStore = (preloadedState = {}) =>
  create<InitialStateTypes>((set, get) => ({
    ...initialState,
    ...preloadedState,
    increment: () => {
      set({
        count: get().count + 1,
      });
    },
    decrement: () => {
      set({
        count: get().count - 1,
      });
    },
    reset: () => {
      set({
        count: initialState.count,
      });
    },
  }));

export function useCreateStore(initialState: InitialStateTypes) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);

  // And if initialState changes, then merge states in the next render cycle.
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store;
}
