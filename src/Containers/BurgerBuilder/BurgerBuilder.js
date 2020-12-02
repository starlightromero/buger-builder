import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Loader from '../../Components/UI/Loader/Loader'
import axios from '../../axios-orders'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

export const BurgerBuilder = props => {
  const [ purchasing, setPurchasing ] = useState(false)

  const ingredients = useSelector(state => state.burgerBuilder.ingredients)
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
  const error = useSelector(state => state.burgerBuilder.error)
  const isAuthenticated = useSelector(state => state.auth.token !== null)

  const dispatch = useDispatch()

  const onIngredientAdded = ingredient => dispatch(actions.addIngredient(ingredient))
  const onIngredientRemoved = ingredient => dispatch(actions.removeIngredient(ingredient))
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [])
  const onInitPurchase = () => dispatch(actions.purchaseInit())
  const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

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
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push('/checkout')
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
        <Burger ingredients={ingredients} />
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

export default withErrorHandler(BurgerBuilder, axios)
