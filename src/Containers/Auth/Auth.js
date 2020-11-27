import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import classes from './Auth.module.css'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import Loader from '../../Components/UI/Loader/Loader'
import * as actions from '../../store/actions'
import { checkValidity } from '../../shared/validation'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
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
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false,
    isSignUp: false,
  }

  componentDidMount () {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/')
    }
  }

  submitHandler = event => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp,
    )
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = {
      ...this.state.controls
    }
    const updatedFormElement = {
      ...updatedControls[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedControls[inputIdentifier] = updatedFormElement

    let formIsValid = true
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid
    }
    this.setState({controls: updatedControls, formIsValid: formIsValid})
  }
  
  render () {
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    let authButtonText = 'SIGN UP'
    let changeAuthButtonText = 'Already have an account? SIGN IN'

    if (!this.state.isSignUp) {
      changeAuthButtonText= 'Need an account? SIGN UP'
      authButtonText = 'SIGN IN'
    }
    
    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid}>
          {authButtonText}
        </Button>
      </form>
    )

    if (this.props.loading) {
      <Loader />
    }

    let errorMesage = null

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={() => this.props.onAuthRedirectPath('/')} />
    }
    
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMesage}
        {form}
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          {changeAuthButtonText}
        </Button>
      </div>
    )
  }
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
