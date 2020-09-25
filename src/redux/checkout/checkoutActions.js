import CheckoutActionTypes from './checkoutActionTypes';

export const checkoutStart = (stripeData) => ({
  type: CheckoutActionTypes.CHECKOUT_START,
  payload: stripeData
})

export const checkoutSuccess = () => ({
  type: CheckoutActionTypes.CHECKOUT_SUCCESS,
})

export const checkoutFailure = (error) => ({
  type: CheckoutActionTypes.CHECKOUT_FAILURE,
  payload: error
})