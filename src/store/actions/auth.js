import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT
  }
}

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  }
}

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignUp
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}
