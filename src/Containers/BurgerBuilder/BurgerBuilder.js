import React, {Component} from 'react'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Loader from '../../Components/UI/Loader/Loader'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount() {
    // axios.get('ingredients.json').then(response => {
    //   this.setState({ingredients: response.data})
    // }).catch(error => {
    //   this.setState({error: true})
    // })
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
    const { ingredients } = this.props
    const queryParams = []
    for (let i in ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]))
    }
    queryParams.push(`price=${this.props.totalPrice}`)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    })
  }

  render() {
    const { purchasing, error } = this.state
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

    if (this.state.loading) {
      orderSummary = <Loader />
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient => dispatch({ type: actions.ADD_INGREDIENT, ingredientName:  ingredient}),
    onIngredientRemoved: ingredient => dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName:  ingredient})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
