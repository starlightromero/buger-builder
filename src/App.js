import './App.css'
import Layout from './Containers/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'

function App () {
  return (
    <div className='App'>
      <Layout>
        <BurgerBuilder />
        <Checkout />
      </Layout>
    </div>
  )
}

export default App
