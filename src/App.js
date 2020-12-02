import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import Layout from './Containers/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
import Signout from './Containers/Auth/Signout/Signout'
import * as actions from './store/actions'

const App = props => {
  const isAuthenticated = useSelector(state => state.auth.token !== null)
  const dispatch = useDispatch()
  const onTryAutoSignUp = useCallback(() => dispatch(actions.authCheckState()), [])

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

  if (isAuthenticated) {
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

export default withRouter(App)
