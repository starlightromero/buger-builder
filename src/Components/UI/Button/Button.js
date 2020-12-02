import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.css'

const Button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
)

Button.propTypes = {
  disabled: PropTypes.bool,
  clicked: PropTypes.func,
  children: PropTypes.string,
  btnType: PropTypes.string
}

export default Button
