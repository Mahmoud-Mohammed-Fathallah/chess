import React from 'react'

function Square({children, color}) {
  return (
    <div className={color+' square'}>
      {children}
    </div>
  )
}

export default Square
