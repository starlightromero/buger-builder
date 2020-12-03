import React from 'react'
import PropTypes from 'prop-types'
import classes from './OrderSummary.module.css'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>
          {key}
        </span>: {props.ingredients[key]}
      </li>
    )
  })

  return (
    <div className={classes.OrderSummary}>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.purchasedContinued}>
        CONTINUE
      </Button>
    </div>
  )
}

OrderSummary.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  price: PropTypes.number.isRequired,
  purchaseCanceled: PropTypes.func.isRequired,
  purchasedContinued: PropTypes.func.isRequired
}

export default OrderSummary
