import React from 'react'
import PropTypes from 'prop-types'
import classes from './BurgerIngredient.css'

const burgerIngredients = props => {
  let ingredient = null

  switch (props.type) {
    case ('bread-bottom'):
      ingredient = <div className={classes.BreadButtom} />
      break
    case ('bread-top'):
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      )
      break
    case ('meat'):
      ingredient = <div className={classes.Meat} />
      break
    case ('cheese'):
      ingredient = <div className={classes.Meat} />
      break
    case ('bacon'):
      ingredient = <div className={classes.Bacon} />
      break
    case ('salad'):
      ingredient = <div className={classes.Salad} />
      break
    default:
      break
  }

  return ingredient
}

burgerIngredients.propTypes = {
  type: PropTypes.string.isRequired
}

export default burgerIngredients
