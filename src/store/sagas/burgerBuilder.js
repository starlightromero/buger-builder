import api from '../../api'
import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function * initIngredientsSaga (action) {
  try {
    const response = yield api.get('ingredients.json')
    yield put(actions.setIngredients(response.data))
  } catch (error) {
    yield put(actions.fetchIngredientsFail())
  }
}
