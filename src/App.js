import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter, Switch, Redirect } from 'react-router-dom'
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
    let routes = (
      <Switch>
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/' component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/orders' component={Orders} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/auth' component={Auth} />
          <Route exact path='/' component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
