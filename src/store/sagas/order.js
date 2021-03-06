import api from '../../api'
import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function * purchaseBurgerSaga (action) {
  yield put(actions.purchaseBurgerStart())
  try {
    const response = yield api.post(`orders.json?auth=${action.token}`, action.orderData)
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
  } catch (error) {
    yield (put.purchaseBurgerFail(error))
  }
}

export function * fetchOrdersSaga (action) {
  yield put(actions.fetchOrdersStart())
  try {
    const response = yield api.get(
      `/orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
    )
    const fetchedOrders = []
    for (const key in response.data) {
      fetchedOrders.push({
        id: key, ...response.data[key]
      })
    }
    console.log('FETCHED ORDERS', fetchedOrders)
    yield put(actions.fetchOrdersSuccess(fetchedOrders))
  } catch (error) {
    yield put(actions.fetchOrdersFail(error))
  }
}
