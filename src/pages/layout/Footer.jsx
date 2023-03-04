import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navegation from './Navegation'

function Footer () {
  const user = useSelector((state) => state.user)
  console.log(user)
  const partner = useSelector((state) => state.partner)
  console.log(partner)

  return (
    <Navbar bg="dark" fixed="bottom">
      <Container>

        <div className="m-2">
          <Navegation />
        </div>
        <Navbar.Text>
          {user.role === 'ADMINISTRADOR' && (
            <>
              <Link to="partner/register" className="text-success p-3">
                Crear Partner
              </Link>
            </>
          )}
          {(user.role === 'ADMINISTRADOR' || partner.type === 'DISTRIBUIDOR') && (
            <>
              <Link to="products/register" className="text-success">
                Crear Producto
              </Link>
            </>
          )}
        </Navbar.Text>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="text-primary">
            Usuario:{' '}
            <span className="text-danger">
              {(user && user.name) || (partner && partner.name)}{' '}
            </span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Footer
