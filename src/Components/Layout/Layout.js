import React from 'react'
import classes from './Layout.css'

const layout = props => {
  return (
    <>
      <div>Toolbar, SideDraw, Backdrop</div>
      <main className={classes.Content}>
        {props.children}
      </main>
    </>
  )
}

export default layout
