import React, { PropTypes } from 'react'

const CenterModule = ({children,width, bgColor}) => {
  const divStyle = {
    marginTop: 50,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor
  }
  return (
    <div style={divStyle}>
      <div style={{width}}>
        {children}
      </div>
    </div>
  )
}

export default CenterModule
