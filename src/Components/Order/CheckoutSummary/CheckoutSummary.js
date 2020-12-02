import React from 'react'
import PropTypes from 'prop-types'
import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes great!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger' clicked={props.checkoutCanceled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  )
}

CheckoutSummary.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  checkoutCanceled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired
}

export default CheckoutSummary
