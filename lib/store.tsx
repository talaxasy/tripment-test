import {useLayoutEffect} from 'react';
import create from 'zustand';
import createContext, {UseContextStore} from 'zustand/context';
import mock from '../mock.json';

const zustandContext = createContext();
export const Provider = zustandContext.Provider;
export const useStore: any = zustandContext.useStore;

let store: import('zustand/index').UseStore<FunctionsTypes> | null = null;

export type FilterTypes = 'avalibility' | 'insurance' | 'speciality' | 'sort';

type InitialStateTypes = {
  mock: MockType[];
  searchParams: {
    avalibility: string[];
    insurance: string[];
    speciality: string[];
    sort: string;
    providesOtherPaymentsOptions: boolean;
  };
  modalType: string;
};

type FunctionsTypes = InitialStateTypes & {
  setAvalibility: (arr: string[] | []) => void;
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
  gender: 'Male' | 'Female';
  reviewsCount: number;
  acceptNew: boolean;
  address: string;
  insurances: string;
  telehealth: boolean;
  telehealth_available: string;
  offline_available: string;
  price: number;
};

const initialState: InitialStateTypes = {
  mock: JSON.parse('' + JSON.stringify(mock.data.items)),
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
    setAvalibility: (arr: string[] | []) => {
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
