import React from 'react'

function Logo ({width = "200px"}){
  return (
    <div className={`text-2xl font-semibold ${width}`}>
      Blog
    </div>
  )
}

export default Logo
