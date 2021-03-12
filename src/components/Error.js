import React from 'react'

const Error = ({errorMessage}) => {
  if(errorMessage){
    return (
      <div style={{border: "3px solid red"}}>
        {errorMessage}
      </div>
    )
  }
  return null
  
}

export default Error
