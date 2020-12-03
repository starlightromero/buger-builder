import React from 'react'
import PropTypes from 'prop-types'
import classes from './BuildControl.module.css'

const BuildControl = props => (
  <div className={classes.BuildControl}>
    <button className={classes.Less + ' ' + classes.Button} onClick={props.removed} disabled={props.disabled}>
      -
    </button>
    <div className={classes.Label}>{props.label}</div>
    <button className={`${classes.More} ${classes.Button}`} onClick={props.added}>
      +
    </button>
  </div>
)

BuildControl.propTypes = {
  label: PropTypes.string,
  removed: PropTypes.func,
  disabled: PropTypes.bool,
  added: PropTypes.func
}

export default BuildControl
