import React, { Component } from 'react'
import axios from '../../axios-orders'
import Order from '../../Components/Order/Order.js'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount () {
    axios.get('/orders.json').then(response => {
      const fetchedOrders = []
      for (let key in response.data) {
        fetchedOrders.push({
          id: key, ...response.data[key]
        })
      }
      this.setState({loading: false, orders: fetchedOrders})
    }).catch(error => {
      this.setState({loading: false})
    })
  }

  render () {
    const { orders } = this.state
    return (
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
}

export default withErrorHandler(Orders, axios)
