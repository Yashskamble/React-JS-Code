import React from 'react'

function ErrorComponent({title, errorCnt}) {
  return (
    <div className='error'>
    <h1>{title}</h1>
    <p>{errorCnt}</p>
    </div>
  )
}

export default ErrorComponent