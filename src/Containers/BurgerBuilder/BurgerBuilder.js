import React, { Component } from 'react'
import Burger from '../../Components/Burger/Burger'

class BurgerBuilder extends Component {
  render () {
    return (
      <>
        <Burger />
        <div>Build Controls</div>
      </>
    )
  }
}

export default BurgerBuilder
