import { atom, createStore } from 'jotai'
import { Result } from '../../types/rootpay-secure-payment-sdk';

export const jotaiStore = createStore()

type SubscriptionCallback = {
    subscribe:  ((result: Result) => void)
} | null;

export const subscriptionAtom = atom<SubscriptionCallback>(null)
