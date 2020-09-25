import DirectoryActionTypes from "./directoryActionTypes"


const INITIAL_STATE = {
  sections: null,
  isFetching: false,
  errorMessage: ""
}

const directoryReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case DirectoryActionTypes.FETCH_SECTIONS_START:
      return {
        ...currentState,
        isFetching: true,
        errorMessage: ""
      }
    case DirectoryActionTypes.FETCH_SECTIONS_FAILURE:
      return {
        ...currentState,
        isFetching: false,
        errorMessage: action.payload
      }

    case DirectoryActionTypes.FETCH_SECTIONS_SUCCESS:
      return {
        ...currentState,
        isFetching: false,
        errorMessage: "",
        sections: action.payload
      }
    case DirectoryActionTypes.UPDATE_SECTIONS:
      return {
        ...currentState,
        sections: action.payload
      }
    default:
      return currentState;
  }
}

export default directoryReducer;