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
        key={ingredient.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}>
        {ingredient.name} ({ingredient.amount})
      </span>
    )
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
}

Order.propTypes = {
  ingredients: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired
}

export default Order
