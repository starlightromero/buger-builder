import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Layout from './Containers/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'

function App () {
  return (
    <Router className='App'>
      <Layout>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/' exact component={BurgerBuilder} />
      </Layout>
    </Router>
  )
}

export default App
