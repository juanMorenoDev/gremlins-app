import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [order, setOrder] = useState({})
  const { _id: clientId, type } = useSelector(state => state.partner)
  const navigate = useNavigate()
  const isClientLogged = clientId !== '' && type === 'CLIENTE'
  // Obtenemos la lista de productos desde el servidor

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product`)
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addToOrder = (product) => {
    const { _id } = product
    const newOrder = { ...order }
    if (order[_id]) {
      newOrder[_id] = {
        product: newOrder[_id].product,
        quantity: newOrder[_id].quantity + 1
      }
    } else {
      newOrder[_id] = { product, quantity: 1 }
    }
    setOrder(newOrder)
  }

  const createOrder = async (e) => {
    const products = Object.values(order).map(({ product, quantity }) => ({
      product: product._id,
      quantity
    }))
    try {
      const today = new Date()
      const deliveryDate = `${today.getDate() + 5}/${today.getMonth() + 1}/${today.getFullYear()}`
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order`, {
        products,
        deliveryDate,
        clientId
      })
      console.log(response)
      navigate('/orders')
    } catch (error) {
      console.log(error)
    }
  }

  const remove = (id) => {
    const newOrder = { ...order }
    let quantity = order[id].quantity
    quantity--
    if (quantity === 0) delete newOrder[id]
    else newOrder[id].quantity = quantity
    setOrder(newOrder)
  }

  return (
    <div className="container mt-5">
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">Lista de Productos</h2>
            <Row>
              {products.map((product) => (

                <div key={product._id} className={`col-sm-6 mb-4 ${isClientLogged && Object.values(order).length > 0 ? 'col-lg-6' : 'col-lg-4'}`}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>
                        <strong>Partner ID:</strong> {product._id}
                        <br />
                        <strong>Cantidad Disponible:</strong> {product.quantity}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {isClientLogged
                        ? <Button variant="success" className="ml-2" onClick={() => addToOrder(product)}>
                          Agregar a la orden
                        </Button>
                        : <>
                          <Button variant="primary">Editar</Button><Button variant="danger" className="ml-2">
                            Eliminar
                          </Button>
                        </>}
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </Row>
          </Col>
          {isClientLogged && Object.values(order).length > 0
            ? <Col>
              <h2 className="mb-4">Nueva Orden: </h2>
              <Row>
                {Object.values(order).map(({ product, quantity }) => (

                  <div key={product._id} className="col-sm-6 col-lg-6 mb-4">
                    <Card>
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          <strong>Partner ID:</strong> {product._id}
                          <br />
                          <strong>Cantidad:</strong> {quantity}
                        </Card.Text>
                        <div className="d-flex justify-content-around">
                          <Button variant="danger" className="ml-2" onClick={e => remove(product._id)}>
                            Quitar
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
                {
                  Object.values(order).length <= 0
                    ? ''
                    : <div className="d-flex justify-content-around">
                      <Button variant="success" onClick={createOrder}>
                        Generar Orden
                      </Button>
                    </div>
                }
              </Row>
            </Col>
            : ''}
        </Row>

      </Container>
    </div>
  )
}

export default ProductsList
