import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import classes from './Layout.module.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)
  const isAuthenticated = useSelector(state => state.auth.token !== null)

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }

  return (
    <>
    <Toolbar
      isAuth={isAuthenticated}
      drawerToggleClicked={sideDrawerToggleHandler} />
    <SideDrawer
      isAuth={isAuthenticated}
      open={showSideDrawer}
      closed={sideDrawerClosedHandler} />
    <main className={classes.Content}>
      {props.children}
    </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object
}

export default Layout
