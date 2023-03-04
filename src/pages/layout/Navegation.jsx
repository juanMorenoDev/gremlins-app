// useNavigate go back
//
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import React from 'react'

function Navegation () {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className="mt-auto">
      <Button onClick={goBack}>Go Back</Button>
    </div>
  )
}

export default Navegation
//
