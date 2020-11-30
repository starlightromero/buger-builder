import React from 'react'
import classes from './BuildControl.module.css'

const BuildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <div className={classes.Buttons}>
      <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>
        Less
      </button>
      <button className={classes.More} onClick={props.added}>
        More
      </button>
    </div>
  </div>
)

export default BuildControl
