import React from 'react'
import PropTypes from 'prop-types'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = props => {
  let authNavItems = (
    <NavigationItem link='/auth'>Sign In</NavigationItem>
  )
  if (props.isAuth) {
    authNavItems = (
      <>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        <NavigationItem link='/signout'>Sign Out</NavigationItem>
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

NavigationItems.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default NavigationItems
