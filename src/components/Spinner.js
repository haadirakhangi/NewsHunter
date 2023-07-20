import React from 'react'
import loading from './Ripple-1s-200px.gif'

export default function Spinner() {
  return (
    <div className='text-center'>
        <img src={loading} alt="loading" />
    </div>
  )
}
