import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = props => {
  return (
    <div className={classes.SideDrawer}>
      <div>
        <Logo className={classes.Logo} />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  )
}

export default sideDrawer
