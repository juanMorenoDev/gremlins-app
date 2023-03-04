import React from 'react'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { unsetUser } from '../../redux/reducer/user/userSlice'
import { unSetPartner } from '../../redux/reducer/partner/partnerSlice'

function NavBar () {
  const user = useSelector((state) => state.user)
  console.log('user', user)
  const partner = useSelector((state) => state.partner)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('partner')
    dispatch(unsetUser({}))
    dispatch(unSetPartner({}))
    navigate('/')
  }
  return (
    <>
      <Navbar bg="dark " variant="dark">
        <Container>
          <Nav className="justify-content-start align-items-center">
            <Link to="/" className="fw-bold text-decoration-none text-light m-3">
              GREMLINS
            </Link>

            <Link to="/" className="text-decoration-none text-light m-3 ">
              Home
            </Link>
            {partner.type === 'CLIENTE' && (<>
              <Link Link to="orders" className="text-decoration-none text-light m-3">
                Ver ordenes
              </Link>
              <Link Link to="products" className="text-decoration-none text-light m-3">
                Productos
              </Link>
            </>)}
          </Nav>

          <Nav className="justify-content-end">
            {!user.name && !partner.name
              ? (
                <>
                  <Link to="loginpartner" className="m-2">
                    <Button>Iniciar sesión Clientes</Button>
                  </Link>
                  <Link to="loginpartner" className="m-2">
                    <Button>Iniciar sesión Distribuidores</Button>
                  </Link>
                  <Link to="login" className="m-2">
                    <Button>Iniciar sesión Empleados</Button>
                  </Link>
                </>
                )
              : null}
            {user.name || partner.name || (
              <Link to="/newuser">
                <Button className="m-2 bg-success">Registrase</Button>
              </Link>
            )}
            {(user.name && (
              <Button className="m-2 bg-danger" onClick={logout}>
                Cerrar Sesión {user.name}
              </Button>
            )) ||
              (partner.name && (
                <Button className="m-2 bg-danger" onClick={logout}>
                  Cerrar Sesión {partner.name}
                </Button>
              ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
