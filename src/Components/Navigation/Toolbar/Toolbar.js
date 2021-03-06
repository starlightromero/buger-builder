import React from 'react'
import PropTypes from 'prop-types'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <h1>J.Warner&#39;s</h1>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
)

Toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
}

export default Toolbar
