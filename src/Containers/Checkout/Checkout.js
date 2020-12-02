import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { useSelector } from 'react-redux'

const Checkout = props => {
  const ingredients = useSelector(state => state.burgerBuilder.ingredients)
  const purchased = useSelector(state => state.order.purchased)

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

export default Checkout
