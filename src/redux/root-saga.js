import { all, call } from "redux-saga/effects"
import { cartSagas } from "./cart/cartSagas"
import { checkoutSagas } from "./checkout/checkoutSagas"
import { orderSagas } from "./orders/ordersSagas"
import { shopSagas } from "./shop/shopSagas"
import { userSagas } from "./user/userSagas"

export function* rootSaga() {
  yield all([call(shopSagas), call(userSagas), call(cartSagas), call(checkoutSagas), call(orderSagas)])
}