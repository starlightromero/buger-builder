import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

const Signout = props => {
  useEffect(() => {
    props.onSignout()
  }, [])

  return <Redirect to='/' />
}

const mapDispatchToProps = dispatch => {
  return {
    onSignout: () => dispatch(actions.signout())
  }
}

export default connect(null, mapDispatchToProps)(Signout)
