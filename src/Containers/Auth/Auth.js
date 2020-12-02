import React, { useState, useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Auth.module.css'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import Loader from '../../Components/UI/Loader/Loader'
import * as actions from '../../store/actions'
import { checkValidity } from '../../shared/validation'

const Auth = props => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 8
      },
      valid: false,
      touched: false
    }
  })

  const loading = useSelector(state => state.auth.loading)
  const error = useSelector(state => state.auth.error)
  const isAuthenticated = useSelector(state => state.auth.token !== null)
  const buildingBurger = useSelector(state => state.burgerBuilder.building)
  const authRedirectPath = useSelector(state => state.auth.authRedirectPath)

  const dispatch = useDispatch()

  const onAuth = (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  const onSetAuthRedirectPath = useCallback(path => dispatch(actions.setAuthRedirectPath(path)), [])

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath('/')
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

  const submitHandler = event => {
    event.preventDefault()
    onAuth(
      authForm.email.value,
      authForm.password.value,
      isSignUp
    )
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...authForm
    }
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedAuthForm[inputIdentifier] = updatedFormElement

    let formIsValid = true
    for (const inputIdentifier in updatedAuthForm) {
      formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid
    }
    setAuthForm(updatedAuthForm)
    setFormIsValid(formIsValid)
  }

  const formElementsArray = []
  for (const key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    })
  }

  let authButtonText = 'SIGN UP'
  let changeAuthButtonText = 'Already have an account? SIGN IN'

  if (!isSignUp) {
    changeAuthButtonText = 'Need an account? SIGN UP'
    authButtonText = 'SIGN IN'
  }

  const form = (
    <form onSubmit={submitHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)} />
      ))}
      <Button btnType='Success' disabled={!formIsValid}>
        {authButtonText}
      </Button>
    </form>
  )

  if (loading) {
    <Loader />
  }

  let errorMessage = null

  if (error) {
    errorMessage = (
      <p>{error.message}</p>
    )
  }

  let authRedirect = null
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      {form}
      <Button btnType='Danger' clicked={switchAuthModeHandler}>
        {changeAuthButtonText}
      </Button>
    </div>
  )
}

export default Auth
