import OrdersActionTypes from './ordersActionTypes';
const INITIAL_STATE = {
  userOrders: null,
  isFetching: false,
  errorMessage: null
}

const ordersReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.FETCH_ORDERS_START:
      return {
        ...currentState,
        isFetching: true,
        errorMessage: ""
      }
    case OrdersActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...currentState,
        isFetching: false,
        errorMessage: action.payload
      }

    case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...currentState,
        isFetching: false,
        errorMessage: "",
        userOrders: action.payload
      }
    case OrdersActionTypes.CLEAR_ORDERS:
      return {
        ...currentState,
        userOrders: null
      }
    default:
      return currentState;
  }
}

export default ordersReducer;