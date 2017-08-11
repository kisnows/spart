import React from 'react'
import {Alert} from 'ne-rc'

export default function TestAlert ({show, children}) {
  return (
    <Alert show={show}>
      {children}
    </Alert>
  )
}
