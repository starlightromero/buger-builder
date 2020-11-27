import * as actionTypes from '../actions/actionTypes'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  mayo: 0,
  ketchup: 0,
  onion: 0.5,
  tomato: 0.5,
  lettuce: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  mustard: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          mayo: action.ingredients.mayo,
          ketchup: action.ingredients.ketchup,
          onion: action.ingredients.onion,
          tomato: action.ingredients.tomato,
          lettuce: action.ingredients.lettuce,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
          mustard: action.ingredients.mustard
        },
        totalPrice: 4,
        error: false,
        building: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

export default reducer
