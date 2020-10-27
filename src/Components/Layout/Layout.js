import React from 'react'

const layout = props => {
  <>
    <div>Toolbar, SideDraw, Backdrop</div>
    <main>
      {props.children}
    </main>
  </>
}

export default layout
