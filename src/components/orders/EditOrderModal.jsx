import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import axios from 'axios'

const EditOrderModal = ({ selectedOrder, isOpen, onClose }) => {
  const [order, setOrder] = useState({
    _id: selectedOrder._id,
    deliveryDate: selectedOrder.deliveryDate,
    status: selectedOrder.status,
    clientId: selectedOrder.clientId._id
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setOrder({ ...order, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // Enviar solicitud
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/order`,
        order
      )
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
          <Modal.Title>Editar Orden</Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="deliveryDate">
            <Form.Label>Fecha de entrega estimada</Form.Label>
            <Form.Control
              type="text"
              name="deliveryDate"
              value={order.deliveryDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={order.status}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="clientId">
            <Form.Label>ID del cliente</Form.Label>
            <Form.Control
              type="text"
              name="clientId"
              value={order.clientId}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditOrderModal
