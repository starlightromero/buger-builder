import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import classes from './Auth.module.css'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import Loader from '../../Components/UI/Loader/Loader'
import * as actions from '../../store/actions'
import { checkValidity } from '../../shared/validation'

const Auth = props => {
  const [ formIsValid, setFormIsValid ] = useState(false)
  const [ isSignUp, setIsSignUp ] = useState(false)
  const [ authForm, setAuthForm ] = useState({
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

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath('/')
    }
  }, [])

  submitHandler = event => {
    event.preventDefault()
    props.onAuth(
      authForm.email.value,
      authForm.password.value,
      isSignUp,
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
    for (let inputIdentifier in updatedAuthForm) {
      formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid
    }
    setAuthForm(updatedAuthForm)
    setFormIsValid(formIsValid)
  }

  const formElementsArray = []
  for (let key in authForm) {
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

  let form = (
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

  if (props.loading) {
    <Loader />
  }

  let errorMessage = null

  if (props.error) {
    errorMessage = (
      <p>{props.error.message}</p>
    )
  }

  let authRedirect = null
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={() => props.onAuthRedirectPath('/')} />
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

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
