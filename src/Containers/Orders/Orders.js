import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api'
import classes from './Orders.module.css'
import Order from '../../Components/Order/Order.js'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import Loader from '../../Components/UI/Loader/Loader'
import * as actions from '../../store/actions'

const Orders = props => {
  const orders = useSelector(state => state.order.orders)
  const loading = useSelector(state => state.order.loading)
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)

  const dispatch = useDispatch()
  const onFetchOrders = useCallback(
    (token, userId) => dispatch(actions.fetchOrders(token, userId)), []
  )

  useEffect(() => {
    onFetchOrders(token, userId)
  }, [onFetchOrders])

  let displayOrders = <Loader />
  if (!loading) {
    displayOrders = (
      <>
        {orders.map(order => (
          <Order
            key={order.id}
            price={+order.price}
            ingredients={order.ingredients} />
        ))}
      </>
    )
  }
  return (
    <div className={classes.Orders}>
      {displayOrders}
    </div>
  )
}

export default withErrorHandler(Orders, api)
