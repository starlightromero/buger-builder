import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = event => {
    this.props.history.replace('/checkout/contact-data')
  }

  render () {
    const { ingredients, purchased } = this.props
    let summary = <Redirect to='/' />
    if (ingredients) {
      const purchaseRedirect = purchased ? <Redirect to='/' /> : null
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={ingredients} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout)
