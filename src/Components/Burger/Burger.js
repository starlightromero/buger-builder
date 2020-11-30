import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngedient/BurgerIngredient'

const Burger = props => {
  let ingredients = Object.keys(props.ingredients).map(ingredient => {
    return [...Array(props.ingredients[ingredient])].map((_, i) => {
      return <BurgerIngredient key={`${ingredient}${i}`} type={ingredient} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, [])

  if (ingredients.length === 0) {
    ingredients = <p>Start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default Burger
