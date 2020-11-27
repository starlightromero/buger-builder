import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import Order from '../../Components/Order/Order.js'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import Loader from '../../Components/UI/Loader/Loader'
import * as actions from '../../store/actions'

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders(this.props.token, this.props.userId)
  }

  render () {
    const { orders, loading } = this.props
    let displayOrders = <Loader />
    if (!loading) {
      displayOrders = (
        <div>
          {orders.map(order => (
            <Order
              key={order.id}
              price={+order.price}
              ingredients={order.ingredients} />
          ))}
        </div>
      )
    }
    return displayOrders
  }
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
