import React from 'react'
import PropTypes from 'prop-types'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = props => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? 1 : 0
      }}
      >
      {props.children}
    </div>
  </>
)

Modal.propTypes = {
  show: PropTypes.bool,
  modalClosed: PropTypes.func,
  children: PropTypes.object
}

export default React.memo(
  Modal,
  (prevProps, nextProps) => (
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
  )
)
