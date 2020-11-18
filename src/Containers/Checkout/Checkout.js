import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price})
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = event => {
    event.preventDefault()
    this.props.history.replace('/checkout/contact-data')
  }
  
  render () {
    const { ingredients, totalPrice } = this.state
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={ingredients} />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={ingredients}
              price={totalPrice}
              {...props} />
          )} />
      </div>
    )
  }
}

export default Checkout
