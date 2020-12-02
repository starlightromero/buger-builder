import React from 'react'
import PropTypes from 'prop-types'
import BurgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={BurgerLogo} alt='MyBurger' />
  </div>
)

Logo.propTypes = {
  height: PropTypes.number
}

export default Logo
