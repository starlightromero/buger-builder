import React from 'react'
import PropTypes from 'prop-types'
import LogoImage from '../../assets/images/logo.png'
import classes from './Logo.module.css'

const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={LogoImage} alt='JWarners' />
  </div>
)

Logo.propTypes = {
  height: PropTypes.number
}

export default Logo
