import React, {Component} from 'react'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../Components/UI/Loader/Loader'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'

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
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)
    this.setState({purchasable: sum > 0})
  }

  addIngredientsHandler = type => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = this.state.ingredients[type] + 1
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientsHandler = type => {
    if (this.state.ingredients[type] === 0) {
      return
    }
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = this.state.ingredients[type] - 1
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    const { ingredients, totalPrice } = this.state
    axios.post('orders.json', {
      ingredients,
      totalPrice,
      customer: {
        name: 'Starlight Romero',
        address: {
          street: '666 Underworld Way',
          zipCode: '06660',
          country: 'Hell'
        },
      email: 'starlight@starlight.com'
      },
      deliveryMethod: 'fastest'
    }).then(response => {
      this.setState({ loading: false, purchasing: false })
    }).catch(error => {
      this.setState({ loading: false, purchasing: false })
    })
  }

  render() {
    const {ingredients, totalPrice, purchasable, purchasing} = this.state
    const disabledInfo = {
      ...ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchasedContinued={this.purchaseContinueHandler}
        price={totalPrice}
      />
    )
    if (this.state.loading) {
      orderSummary = <Loader />
    }

    return (
      <>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients = {ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientsHandler}
          ingredientRemoved={this.removeIngredientsHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={purchasable}
          ordered={this.purchaseHandler}
        />
  </>)
  }
}

export default withErrorHandler(BurgerBuilder, axios)
