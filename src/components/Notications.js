import React from 'react'

const Notications = ({notification}) => {
  if(notification){
    return (
      <div style={{border: "3px solid green"}}>
        {notification}
      </div>
    )
  }
  return null
  
}

export default Notications
