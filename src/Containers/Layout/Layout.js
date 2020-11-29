import React, { useState } from 'react'
import { connect } from 'react-redux'
import classes from './Layout.module.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)
  
  sideDrawerClosedHandler = () => {
    setShowSideDrawer(false)
  }

  sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }
  
  const { isAuthenticated } = this.props
  
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
