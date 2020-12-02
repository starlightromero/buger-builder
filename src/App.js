import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Layout from './Containers/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
import Signout from './Containers/Auth/Signout/Signout'
import * as actions from './store/actions'

const App = props => {
  const { onTryAutoSignUp } = props

  useEffect(() => {
    onTryAutoSignUp()
  }, [onTryAutoSignUp])

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route exact path='/' component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/signout' component={Signout} />
        <Route path='/auth' component={Auth} />
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

App.propTypes = {
  onTryAutoSignUp: PropTypes.func,
  isAuthenticated: PropTypes.bool
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
