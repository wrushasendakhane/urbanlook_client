import DirectoryActionTypes from './directoryActionTypes';
export const updateSections = (sections) => ({
  type: DirectoryActionTypes.UPDATE_SECTIONS,
  payload: sections
})

export const fetchSectionsStart = () => ({
  type: DirectoryActionTypes.FETCH_SECTIONS_START,
})

export const fetchSectionsFailure = (errorMessage) => ({
  type: DirectoryActionTypes.FETCH_SECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchSectionsSuccess = (sections) => ({
  type: DirectoryActionTypes.FETCH_SECTIONS_SUCCESS,
  payload: sections
})