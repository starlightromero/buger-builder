import React from 'react'
import PropTypes from 'prop-types'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Mayo', type: 'mayo' },
  { label: 'Ketchup', type: 'ketchup' },
  { label: 'Onion', type: 'onion' },
  { label: 'Tomato', type: 'tomato' },
  { label: 'Lettuce', type: 'lettuce' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Mustard', type: 'mustard' }
]

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
    <div>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
    </div>
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>
      {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
    </button>
  </div>
)

BuildControls.propTypes = {
  price: PropTypes.number,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  purchasable: PropTypes.bool,
  ordered: PropTypes.func,
  isAuth: PropTypes.bool,
  disabled: PropTypes.object
}

export default BuildControls
