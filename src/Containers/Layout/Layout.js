import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Layout.module.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }
  
  render() {
    const { showSideDrawer } = this.state
    const { isAuthenticated } = this.props
    
    return (
      <>
      <Toolbar
        isAuth={isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={this.sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {this.props.children}
      </main>
      </>
    )  
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
