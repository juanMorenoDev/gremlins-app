import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import { selectPartner } from '../../redux/reducer/partner/partnerSlice'

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [order, setOrder] = useState({})
  const { _id: clientId, type } = useSelector(selectPartner)
  const isClientLogged = clientId !== '' && type === 'CLIENTE'
  // Obtenemos la lista de productos desde el servidor

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/product')
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
    e.preventDefault()
    const products = Object.values(order).map(({ product, quantity }) => ({
      product: product._id,
      quantity
    }))
    try {
      const response = await axios.post('http://localhost:3001/order', {
        products,
        deliveryDate: new Date().toDateString(),
        clientId
      })
      setProducts(response.data)
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
      <h2 className="mb-4">Lista de Productos</h2>
      <div className="row">
        <div className="column">
          <div className="row">
            {products.map((product) => (

              <div key={product._id} className="col-sm-6 col-lg-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <strong>Partner ID:</strong> {product._id}
                      <br />
                      <strong>Cantidad:</strong> {product.quantity}
                    </Card.Text>
                    <div className="d-flex justify-content-around">
                      {isClientLogged
                        ? <Button variant="success" className="ml-2" onClick={() => addToOrder(product)}>
                        Agregar a la orden
                      </Button>
                        : ''}
                      <Button variant="primary">Editar</Button>
                      <Button variant="danger" className="ml-2">
                        Eliminar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="column">
          Nueva Orden:
          <div className="row">
            {Object.values(order).map(({ product, quantity }) => (

              <div key={product._id} className="col-sm-6 col-lg-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <strong>Partner ID:</strong> {product._id}
                      <br />
                      <strong>Cantidad disponible:</strong> {quantity}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsList
