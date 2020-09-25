import CheckoutActionTypes from './checkoutActionTypes';

const INITIAL_STATE = {
  error: null
}

const checkoutReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.CHECKOUT_SUCCESS:
      return {
        ...currentState,
        error: null
      };
    case CheckoutActionTypes.CHECKOUT_FAILURE:
      return {
        ...currentState,
        error: action.payload
      };
    default:
      return currentState;
  }
};
export default checkoutReducer;