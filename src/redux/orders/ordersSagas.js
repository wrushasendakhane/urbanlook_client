import { takeLatest, call, put, all, select } from "redux-saga/effects"
import { convertOrdersSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import OrdersActionTypes from "./ordersActionTypes";
import { fetchOrdersFailure, fetchOrdersSuccess } from './ordersActions';
import { selectCurrentUser } from '../user/userSelectors';
import UserActionTypes from "../user/userActionTypes";

export function* fetchOrdersStartAsync() {
  try {
    const currentUser = yield select(selectCurrentUser);
    const ordersRef = firestore.doc(`users/${currentUser.id}`).collection("orders").orderBy("createdAt", "desc");
    const snapshot = yield ordersRef.get()
    const ordersMap = yield call(convertOrdersSnapshotToMap, snapshot);
    yield put(fetchOrdersSuccess(ordersMap))
  } catch (error) {
    yield put(fetchOrdersFailure(error.message))
  }
}

export function* fetchOrdersStart() {
  yield takeLatest(OrdersActionTypes.FETCH_ORDERS_START, fetchOrdersStartAsync)
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchOrdersStartAsync)
}

export function* orderSagas() {
  yield all([call(fetchOrdersStart), call(onSignInSuccess)])
}
