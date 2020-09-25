import { createSelector } from 'reselect';

const selectOrders = state => state.orders;

export const selectUserOrders = createSelector(
  [selectOrders],
  orders => orders.userOrders
)

export const selectIsFetching = createSelector([selectOrders], orders => orders.isFetching)

export const selectError = createSelector([selectOrders], orders => orders.errorMessage)