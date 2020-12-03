import React, { useState } from 'react'
import api from '../../../api'
import classes from './ContactData.module.css'
import Loader from '../../../Components/UI/Loader/Loader'
import Button from '../../../Components/UI/Button/Button'
import Input from '../../../Components/UI/Input/Input'
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../store/actions'
import { checkValidity } from '../../../shared/validation'

const ContactData = props => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zip: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Zip Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    }
  })

  const ingredients = useSelector(state => state.burgerBuilder.ingredients)
  const price = useSelector(state => state.burgerBuilder.totalPrice)
  const loading = useSelector(state => state.order.loading)
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)

  const dispatch = useDispatch()

  const onOrderBurger = (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))

  const orderHandler = event => {
    event.preventDefault()
    const orderData = {}
    for (const formElementIdentifier in orderForm) {
      orderData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients,
      price,
      orderData,
      userId
    }
    onOrderBurger(order, token)
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement

    let formIsValid = true
    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  }

  const formElementsArray = []

  for (const key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }

  let form = (
    <form onSubmit={orderHandler}>
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
      <Button btnType='Success' disabled={!formIsValid}>ORDER</Button>
    </form>
  )
  if (loading === true) {
    form = <Loader />
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  )
}

export default withErrorHandler(ContactData, api)
