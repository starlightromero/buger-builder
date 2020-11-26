import React, { Component } from 'react'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Loader from '../../Components/UI/Loader/Loader'
import axios from '../../axios-orders'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount () {
    this.props.onInitIngredients()
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)
    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  render() {
    const { purchasing } = this.state
    const { error } = this.props
    const { ingredients, totalPrice, onIngredientAdded, onIngredientRemoved } = this.props
    const disabledInfo = {
      ...ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Loader />
    if (ingredients) {
      burger = (
        <>
          <Burger ingredients = {ingredients} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={this.updatePurchaseState(ingredients)}
            ordered={this.purchaseHandler}
            />
        </>
      )
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchasedContinued={this.purchaseContinueHandler}
          price={totalPrice}
        />
      )
    }

    return (
      <>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient => dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: ingredient => dispatch(actions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
