import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import './App.css'
import Layout from './Containers/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
import Logout from './Containers/Auth/Logout/Logout'
import * as actions from './store/actions'

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp()
  }

  render () {
    return (
      <Router className='App'>
        <Layout>
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/orders' component={Orders} />
          <Route exact path='/auth' component={Auth} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/' component={BurgerBuilder} />
        </Layout>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
