import {useLayoutEffect} from 'react';
import create from 'zustand';
import createContext, {UseContextStore} from 'zustand/context';
import mock from '../mock.json';

const zustandContext = createContext();
export const Provider = zustandContext.Provider;
//set any to abandon conflicts of types, instead of UseContextStore<FunctionsTypes>
export const useStore: UseContextStore<FunctionsTypes> = zustandContext.useStore;

let store: import('zustand/index').UseStore<FunctionsTypes> | null = null;

export type FilterTypes = 'avalibility' | 'insurance' | 'speciality' | 'sort';

type InitialStateTypes = {
  mock: MockType[];
  searchParams: {
    avalibility: Array<{title: string; people: number[]}>;
    insurance: string[];
    speciality: string[];
    sort: string;
    providesOtherPaymentsOptions: boolean;
  };
  modalType: string;
};

type FunctionsTypes = InitialStateTypes & {
  setAvalibility: (arr: Array<{title: string; people: number[]}> | []) => void;
  setSpeciality: (arr: string[] | []) => void;
  setInsurance: (arr: string[] | []) => void;
  setSort: (str: string) => void;
  resetInsurance: () => void;
  resetAvalibility: () => void;
  resetSpeciality: () => void;
  setProvidesOtherPayOptions: (boo: boolean) => void;
  resetAllFilters: () => void;
  setModalType: (type: string) => void;
};

export type MockType = {
  id: number;
  name: string;
  speciality: string;
  experience: number;
  gender: string;
  reviewsCount: number;
  acceptNew: boolean;
  address: string;
  insurances: string;
  telehealth: boolean;
  telehealth_available: string;
  offline_available: string;
  price: number;
  img: number;
};

const initialState: InitialStateTypes = {
  mock: mock.data.items.map(el => ({...el, img: Math.floor(Math.random() * 4)})),
  searchParams: {
    avalibility: [],
    insurance: [],
    speciality: [],
    sort: 'Next available',
    providesOtherPaymentsOptions: false,
  },
  modalType: 'none',
};

export const initializeStore = (preloadedState = {}) =>
  create<FunctionsTypes>((set, get) => ({
    ...initialState,
    ...preloadedState,
    setAvalibility: (arr: Array<{title: string; people: number[]}> | []) => {
      set({
        searchParams: {...get().searchParams, avalibility: arr},
      });
    },
    setSpeciality: (arr: string[] | []) => {
      set({
        searchParams: {...get().searchParams, speciality: arr},
      });
    },
    setInsurance: (arr: string[] | []) => {
      set({
        searchParams: {...get().searchParams, insurance: arr},
      });
    },
    setSort: (arr: string) => {
      set({
        searchParams: {...get().searchParams, sort: arr},
      });
    },
    setProvidesOtherPayOptions: (boo: boolean) => {
      set({
        searchParams: {...get().searchParams, providesOtherPaymentsOptions: boo},
      });
    },
    resetAvalibility: () => {
      set({
        searchParams: {...get().searchParams, avalibility: []},
      });
    },
    resetSpeciality: () => {
      set({
        searchParams: {...get().searchParams, speciality: []},
      });
    },
    resetInsurance: () => {
      set({
        searchParams: {...get().searchParams, insurance: [], providesOtherPaymentsOptions: false},
      });
    },
    resetAllFilters: () => {
      set({
        searchParams: {
          insurance: [],
          avalibility: [],
          speciality: [],
          sort: 'Next available',
          providesOtherPaymentsOptions: false,
        },
      });
    },
    setModalType: (type: string) => {
      set({
        modalType: type,
      });
    },
  }));

export function useCreateStore(initialState: InitialStateTypes) {
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  store = store ?? initializeStore(initialState);

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
