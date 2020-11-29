import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

const Checkout = props => {
  const checkoutCanceledHandler = () => {
    props.history.goBack()
  }

  const checkoutContinuedHandler = event => {
    props.history.replace('/checkout/contact-data')
  }

  let summary = <Redirect to='/' />
  if (ingredients) {
    const purchaseRedirect = purchased ? <Redirect to='/' /> : null
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          checkoutCanceled={checkoutCanceledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={ingredients} />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    )
  }
  return summary
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout)
