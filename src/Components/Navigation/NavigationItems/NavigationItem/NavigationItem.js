import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.module.css'

const NavigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      exact={props.exact}
      to={props.link}
      activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
)

NavigationItem.propTypes = {
  exact: PropTypes.bool,
  link: PropTypes.string.isRequired,
  children: PropTypes.string
}

export default NavigationItem
