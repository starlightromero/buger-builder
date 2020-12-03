import React from 'react'
import PropTypes from 'prop-types'
import classes from './Order.module.css'

const Order = props => {
  const ingredients = []

  for (const ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }

  const ingredientOutput = ingredients.map(ingredient => {
    return (
      <span
        key={ingredient.name}>
        {ingredient.name} ({ingredient.amount})
      </span>
    )
  })

  return (
    <div className={classes.Order}>
      <h3>Ingredients:</h3>
      <p>{ingredientOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
}

Order.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  price: PropTypes.number.isRequired
}

export default Order
