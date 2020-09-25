import CheckoutActionTypes from './checkoutActionTypes';

const INITIAL_STATE = {
  errorMessage: null
}

const checkoutReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.CHECKOUT_SUCCESS:
      return {
        ...currentState,
        errorMessage: null
      };
    case CheckoutActionTypes.CHECKOUT_FAILURE:
      return {
        ...currentState,
        errorMessage: action.payload
      };
    default:
      return currentState;
  }
};
export default checkoutReducer;