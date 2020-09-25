import { call, put, all, takeLatest, select } from "redux-saga/effects"
import CheckoutActionTypes from './checkoutActionTypes';
import axios from "axios";
import { checkoutFailure, checkoutSuccess } from "./checkoutActions";
import { saveUserOrderDocument } from "../../firebase/firebase.utils";
import { selectCurrentUser } from '../user/userSelectors';
import { selectCartItems } from "../cart/cartSelectors";
import { clearCart } from "../cart/cartActions";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL
}

export function* clearCartOnCheckout() {
  yield put(clearCart())
}

export function* onCheckoutSuccess() {
  yield takeLatest(CheckoutActionTypes.CHECKOUT_SUCCESS, clearCartOnCheckout)
}

export function* checkout({ payload }) {
  try {
    const stripeResponse = yield axios.post("/payment", { ...payload })
    const receiptUrl = stripeResponse.data.success.receipt_url
    const currentUser = yield select(selectCurrentUser);
    const cartItems = yield select(selectCartItems);
    yield call(saveUserOrderDocument, { uid: currentUser.id, cartItems, total: payload.amount / 100, receiptUrl })
    yield put(checkoutSuccess())
  } catch (error) {
    yield put(checkoutFailure(error.message));
  }
}

export function* onCheckoutStart() {
  yield takeLatest(CheckoutActionTypes.CHECKOUT_START, checkout)
}

export function* checkoutSagas() {
  yield (all([call(onCheckoutStart), call(onCheckoutSuccess)]))
}