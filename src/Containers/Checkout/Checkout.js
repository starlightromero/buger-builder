import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import Modal from '../../Components/UI/Modal/Modal'

const Checkout = props => {
  const [showModal, setShowModal] = useState(false)
  const ingredients = useSelector(state => state.burgerBuilder.ingredients)
  const purchased = useSelector(state => state.order.purchased)

  const closeModalHandler = () => {
    setShowModal(false)
  }

  const checkoutCanceledHandler = () => {
    props.history.goBack()
  }

  const checkoutContinuedHandler = event => {
    setShowModal(true)
  }

  let summary = <Redirect to='/' />
  if (ingredients) {
    const purchaseRedirect = purchased ? <Redirect to='/' /> : null
    summary = (
      <div>
        {purchaseRedirect}
        <Modal show={showModal} modalClosed={closeModalHandler}>
          <ContactData />
        </Modal>
        <CheckoutSummary
          checkoutCanceled={checkoutCanceledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={ingredients} />
      </div>
    )
  }
  return summary
}

export default Checkout
