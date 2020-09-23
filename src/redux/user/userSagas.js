import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './userActionTypes';
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebase.utils"
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './userActions';


export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* onGoggleSignInStart() {
  yield takeLatest(UserActionTypes.GOGGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
    yield getSnapshotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error))
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );

    yield put(signUpSuccess({ user, additionalData: { displayName } }))

  } catch (error) {
    yield put(signUpFailure(error))
  }
}

export function* signInAferSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAferSignUp)
}

export function* userSagas() {
  yield all([
    call(onGoggleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ])
}