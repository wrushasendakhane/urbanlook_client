import ShopActionTypes from './shopActionTypes';
const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: ""
}

const shopReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...currentState,
        isFetching: true,
        errorMessage: ""
      }
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...currentState,
        isFetching: false,
        errorMessage: action.payload
      }

    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...currentState,
        isFetching: false,
        errorMessage: "",
        collections: action.payload
      }
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...currentState,
        collections: action.payload
      }
    default:
      return currentState;
  }
}

export default shopReducer;