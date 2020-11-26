import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => {
  let authNavItems = (
    <NavigationItem link='/auth'>Authenticate</NavigationItem>
  )
  if (props.isAuth) {
    authNavItems = (
      <>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        <NavigationItem link='/logout'>Logout</NavigationItem>
      </>
    )
  }

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>Burger Builder</NavigationItem>
      {authNavItems}
    </ul>
  )
}

export default navigationItems
