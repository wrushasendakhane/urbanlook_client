import { createSelector } from 'reselect';

const selectCheckout = state => state.checkout;

export const selectError = createSelector([selectCheckout], checkout => checkout.error)