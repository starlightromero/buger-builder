import React, { Component } from 'react'
import axios from '../../../axios-orders'
import classes from './ContactData.module.css'
import Loader from '../../../Components/UI/Loader/Loader'
import Button from '../../../Components/UI/Button/Button'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = event => {
    event.preventDefault()
    this.setState({ loading: true })
    const { ingredients, price, history } = this.props
    axios.post('orders.json', {
      ingredients,
      price,
      customer: {
        name: 'Starlight Romero',
        address: {
          street: '666 Underworld Way',
          zipCode: '06660',
          country: 'Hell'
        },
      email: 'starlight@starlight.com'
      },
      deliveryMethod: 'fastest'
    }).then(response => {
      this.setState({ loading: false })
      history.push('/')
    }).catch(error => {
      this.setState({ loading: false })
    })
  }

  render () {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
