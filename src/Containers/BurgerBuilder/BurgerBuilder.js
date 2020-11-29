import React, { useState, useEffect } from 'react'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Loader from '../../Components/UI/Loader/Loader'
import axios from '../../axios-orders'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

export const BurgerBuilder = props => {
  const [ purchasing, setPurchasing ] = useState(false)
  const {
    history,
    error,
    isAuthenticated,
    ingredients,
    totalPrice,
    onIngredientAdded,
    onIngredientRemoved,
    onInitIngredients,
    onInitPurchase,
    onSetAuthRedirectPath
  } = props

  useEffect(() => {
    onInitIngredients()
  }, [])

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    history.push('/checkout')
  }

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
          purchasable={updatePurchaseState(ingredients)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          />
      </>
    )
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCanceled={purchaseCancelHandler}
        purchasedContinued={purchaseContinueHandler}
        price={totalPrice}
      />
    )
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  )
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient => dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: ingredient => dispatch(actions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
