import React from 'react'
import PropTypes from 'prop-types'
import classes from './BurgerIngredient.module.css'

const burgerIngredient = props => {
  let ingredient = null

  switch (props.type) {
    case ('bread-bottom'):
      ingredient = <div className={classes.BreadBottom} />
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
      ingredient = <div className={classes.Cheese} />
      break
    case ('bacon'):
      ingredient = <div className={classes.Bacon} />
      break
    case ('lettuce'):
      ingredient = <div className={classes.Lettuce} />
      break
    case ('tomato'):
      ingredient = <div className={classes.Tomato} />
      break
    case ('onion'):
      ingredient = <div className={classes.Onion} />
      break
    case ('mustard'):
      ingredient = <div className={classes.Mustard} />
      break
    default:
      break
  }

  return ingredient
}

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default burgerIngredient
