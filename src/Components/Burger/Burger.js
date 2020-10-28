import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngedient/BurgerIngredient'

const burger = props => {
  const ingredients = Object.keys(props.ingredients).map(ingredient => {
    return [...Array(props.ingredients[ingredient])].map((_, i) => {
      <BurgerIngredient key={`${ingredient}${i}`} type={ingredient} />
    })
  })

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      <BurgerIngredient type='cheese' />
      <BurgerIngredient type='meat' />
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default burger
