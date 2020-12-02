import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../../store/actions'

const Signout = props => {
  const { onSignout } = props

  useEffect(() => {
    onSignout()
  }, [onSignout])

  return <Redirect to='/' />
}

const mapDispatchToProps = dispatch => {
  return {
    onSignout: () => dispatch(actions.signout())
  }
}

Signout.propTypes = {
  onSignout: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Signout)
