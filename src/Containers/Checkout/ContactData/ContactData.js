import React, { Component } from 'react'
import axios from '../../../axios-orders'
import classes from './ContactData.module.css'
import Loader from '../../../Components/UI/Loader/Loader'
import Button from '../../../Components/UI/Button/Button'
import Input from '../../../Components/UI/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = event => {
    event.preventDefault()
    this.setState({ loading: true })
    const orderData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      orderData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const { ingredients, price, history } = this.props
    axios.post('orders.json', {
      ingredients,
      price,
      orderData,
    }).then(response => {
      this.setState({ loading: false })
      history.push('/')
    }).catch(error => {
      this.setState({ loading: false })
    })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedOrderForm[inputIdentifier] = updatedFormElement
    this.setState({orderForm: updatedOrderForm})
  }

  render () {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success">ORDER</Button>
      </form>
    )
    if (this.state.loading === true) {
      form = <Loader />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
