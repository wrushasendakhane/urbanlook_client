import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist"

import storage from "redux-persist/lib/storage"
import userReducer from './user/userReducer';
import cartReducer from "./cart/cartReducer"
import directoryReducer from './directory/directoryReducer';
import shopReducer from './shop/shopReducer';
import checkoutReducer from './checkout/checkoutReducer';
import ordersReducer from './orders/ordersReducer';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  checkout: checkoutReducer,
  orders: ordersReducer
});

export default persistReducer(persistConfig, rootReducer)