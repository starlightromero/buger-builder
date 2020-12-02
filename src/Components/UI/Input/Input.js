import React from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

const Input = props => {
  let inputElement = null
  const inputClasses = [classes.InputClasses]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />
      )
      break
    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />
      )
      break
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />
      )
  }

  let validationError = null
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.ValidationError}>
        Please enter a valid {props.valueType}
      </p>
    )
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
}

Input.propTypes = {
  invalid: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  label: PropTypes.string,
  changed: PropTypes.func.isRequired,
  valueType: PropTypes.string,
  value: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  elementType: PropTypes.string.isRequired
}

export default Input
