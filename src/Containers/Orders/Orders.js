import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import Order from '../../Components/Order/Order.js'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import Loader from '../../Components/UI/Loader/Loader'
import * as actions from '../../store/actions'

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders()
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
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
