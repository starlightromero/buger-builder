import React, { useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../../../store/actions'

const Signout = props => {
  const dispatch = useDispatch()
  const onSignout = useCallback(() => dispatch(actions.signout()), [])

  useEffect(() => {
    onSignout()
  }, [onSignout])

  return <Redirect to='/' />
}

export default Signout
