import React, { Component } from 'react'
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
    
    return (
      <>
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} closed={this.sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {this.props.children}
      </main>
      </>
    )  
  }
}

export default Layout
