import React from 'react'

const Button = ({
    children,
    type='button',
    className='',
    ...props
}) => {

  return (
    <button type={type}  className={`inline-bock px-6 py-2 duration-200 mx-2 hover:bg-black rounded-full ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
