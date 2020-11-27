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
  localStorage.removeItem('token')
  localStorage.removeItem('expirationTime')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7jLgMCDialiXBVQ_alNEJlPiVVNf2KR8'
    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7jLgMCDialiXBVQ_alNEJlPiVVNf2KR8'
    }
    axios.post(url, authData).then(response => {
      const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('expirationTime', expirationTime)
      localStorage.setItem('userId', response.data.localId)
      dispatch(authSuccess(response.data.idToken, response.data.localId))
      dispatch(checkAuthTimeout(response.data.expiresIn))
    }).catch(error => {
      dispatch(authFail(error.response.data.error))
    })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationTime'))
      if (expirationTime > new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        )
      } else {
        dispatch(logout())
      }
    }
  }
}
