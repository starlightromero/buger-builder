import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => {
  let authNavItem = (
    <NavigationItem link='/auth'>Authenticate</NavigationItem>
  )
  if (!props.isAuth) {
    authNavItem = (
      <NavigationItem link='/logout'>Logout</NavigationItem>
    )
  }

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      {authNavItem}
    </ul>
  )
}

export default navigationItems
