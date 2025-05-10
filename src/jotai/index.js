import { atom, createStore } from 'jotai';
export const jotaiStore = createStore();
export const subscriptionAtom = atom(null);
export const sdkAtom = atom(null);
