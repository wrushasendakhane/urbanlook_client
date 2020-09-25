import OrdersActionTypes from './ordersActionTypes';

export const fetchOrdersStart = () => ({
  type: OrdersActionTypes.FETCH_ORDERS_START,
})

export const fetchOrdersFailure = (errorMessage) => ({
  type: OrdersActionTypes.FETCH_ORDERS_FAILURE,
  payload: errorMessage
})

export const fetchOrdersSuccess = (orders) => ({
  type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders
})

