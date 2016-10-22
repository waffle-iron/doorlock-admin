import React, { PropTypes } from 'react'
import { number } from '@kadira/storybook-addon-knobs';

export default (cWidth, nobActive = false) => (story) => {
  const content = story()
  const style = {
    width: nobActive ? number('containerWidth (decorator)', cWidth) : cWidth
  }

  return (
    <div style={style}>
      {content}
    </div>
  )
}
