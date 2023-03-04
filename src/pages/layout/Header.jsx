import React from 'react'
import Card from 'react-bootstrap/Card'

function Header () {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Card className="mx-auto text-center bg-success ">
          <Card.Body className="text-center text- ">
            Bienvenido añada el producto a su orden, no olvide{' '}
            <strong>iniciar sesión</strong>, ó <strong>Registrarse</strong>
          </Card.Body>
        </Card>
      </div>

    </>
  )
}

export default Header
