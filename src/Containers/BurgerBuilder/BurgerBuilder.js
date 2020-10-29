import React, { Component } from 'react'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4
  }

  addIngredientsHandler = type => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = this.state.ingredients[type] + 1
    const newPrice = this.state.price + INGREDIENT_PRICES[type]
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
  }

  removeIngredientsHandler = type => {

  }

  render () {
    const { ingredients } = this.state
    return (
      <>
        <Burger ingredients={ingredients} />
        <BuildControls ingredientAdded={this.addIngredientsHandler} />
      </>
    )
  }
}

export default BurgerBuilder
