import React, { Component } from 'react'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    }
  }

  componentDidMount () {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients: ingredients})
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }
  
  render () {
    const { ingredients } = this.state
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={ingredients}
        />
      </div>
    )
  }
}

export default Checkout
