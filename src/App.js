import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Layout from './Containers/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
import Logout from './Containers/Auth/Logout/Logout'

function App () {
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

export default App
