import axios from 'axios'
import { delay, put } from 'redux-saga/effects'
import * as actions from '../actions'

export function * signoutSaga (action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationTime')
  yield localStorage.removeItem('userId')
  yield put(actions.signoutSuccess())
}

export function * checkAuthTimeoutSaga (action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.signout())
}

export function * authUserSaga (action) {
  yield put(actions.authStart())
  const authData = {
    email: action.email,
    password: action.email,
    returnSecureToken: true
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7jLgMCDialiXBVQ_alNEJlPiVVNf2KR8'
  if (!action.isSignUp) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7jLgMCDialiXBVQ_alNEJlPiVVNf2KR8'
  }
  try {
    const response = yield axios.post(url, authData)
    const expirationTime = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
    yield localStorage.setItem('token', response.data.idToken)
    yield localStorage.setItem('expirationTime', expirationTime)
    yield localStorage.setItem('userId', response.data.localId)
    yield put(actions.authSuccess(response.data.idToken, response.data.localId))
    yield put(actions.checkAuthTimeout(response.data.expiresIn))
  } catch (error) {
    yield put(actions.authFail(error.response.data.error))
  }
}

export function * authCheckStateSaga (action) {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.signout())
  } else {
    const expirationTime = yield new Date(localStorage.getItem('expirationTime'))
    if (expirationTime > new Date()) {
      const userId = yield localStorage.getItem('userId')
      yield put(actions.authSuccess(token, userId))
      yield put(
        actions.checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      )
    } else {
      yield put(actions.signout())
    }
  }
}
