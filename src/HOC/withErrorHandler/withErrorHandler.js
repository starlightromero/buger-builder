import React, { Component } from 'react'
import Modal from '../../Components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    
    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req
      })
      axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      })
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})  
    }
    
    render() {
      const { error } = this.state
      return (
        <>
          <Modal show={error} modalClosed={this.errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      )
    }
  }
}

export default withErrorHandler
