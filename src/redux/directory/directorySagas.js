import { takeLatest, call, put, all } from "redux-saga/effects"

import { convertSectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchSectionsFailure, fetchSectionsSuccess } from "./directoryActions";
import DirectoryActionTypes from "./directoryActionTypes";

export function* fetchSectionsAsync() {
  try {
    const sectionsRef = firestore.collection("sections").orderBy("id", "asc");
    const snapshot = yield sectionsRef.get()
    const sectionsMap = yield call(convertSectionsSnapshotToMap, snapshot);
    yield put(fetchSectionsSuccess(sectionsMap))
  } catch (error) {
    yield put(fetchSectionsFailure(error.message))
  }
}

export function* fetchSectionsStart() {
  console.log("fetchSectionsStart")
  yield takeLatest(DirectoryActionTypes.FETCH_SECTIONS_START, fetchSectionsAsync)
}

export function* directorySagas() {
  yield all([call(fetchSectionsStart)])
}