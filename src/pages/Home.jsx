import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import OrdersList from '../components/orders/OrdersList'
import PartnersList from '../components/partners/PartnersList'
import ProductsList from '../components/products/ProductsList'

function Home () {
  const user = useSelector((state) => state.user)
  const { role } = user
  const { type, name } = useSelector((state) => state.partner)

  console.log('role', role)
  console.log('par', type)

  return (
    <div className="p-3">
      <div>
        <Card>
          <Card.Body className="text-center">
            Welcome {(role && user.name) || (type && name)}{' '}
          </Card.Body>
        </Card>
      </div>
      <div>
        {role === 'RECEPCIONISTA'
          ? (
            <>
              <PartnersList type="CLIENTE" />
              <PartnersList type="DISTRIBUIDOR" />
            </>
            )
          : (role === 'EMPACADOR') || (role === 'TRANSPORTADOR')
              ? (
              <OrdersList />
                )
              : role === 'ADMINISTRADOR'
                ? (
                <>
                  <PartnersList type="CLIENTE" />
                  <PartnersList type="DISTRIBUIDOR" />
                </>
                  )
                : (type === 'CLIENTE') || (type === 'DISTRIBUIDOR')
                    ? (
                  <>
                    <ProductsList />
                  </>
                      )
                    : (
                  <h1>NO TIENES PERMISOS PARA VER ESTA PAGINA</h1>
                      )}
      </div>
    </div>
  )
}

export default Home
