import { delay } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* logoutSaga (action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationTime')
  yield localStorage.removeItem('userId')
  yield put(actions.logoutSuccess())
}

export function* checkAuthTimeoutSaga (action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}
