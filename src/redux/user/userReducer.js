import UserActionTypes from "./userActionTypes";

const INITIAL_STATE = {
  currentUser: null,
  error: null
}

const userReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...currentState,
        currentUser: action.payload,
        error: null
      }
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...currentState,
        error: action.payload
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...currentState,
        currentUser: null,
        error: null
      }

    default:
      return currentState;
  }
}

export default userReducer;