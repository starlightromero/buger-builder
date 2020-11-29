import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import Order from '../../Components/Order/Order.js'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import Loader from '../../Components/UI/Loader/Loader'
import * as actions from '../../store/actions'

const Orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId)
  }, [])


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
    <div>
      <h1>Orders</h1>
      {displayOrders}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
