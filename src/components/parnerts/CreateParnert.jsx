import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CreatePartner = () => {
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const { id } = useParams()

  const [partner, setPartner] = useState({
    name: '',
    lastName: '',
    documentType: 'CC',
    partnerId: '',
    phone: '',
    address: '',
    email: '',
    type: 'CLIENTE',
    error: ''
  })

  useEffect(() => {
    if (id) {
      console.log('id', id)
      setEdit(true)
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/partner/${id}`).then((response) => {
        const { data } = response
        console.log(data)
        setPartner({
          name: data.name,
          lastName: data.lastName,
          documentType: data.documentType,
          partnerId: data.partnerId,
          phone: data.phone,
          address: data.address,
          email: data.email,
          type: data.type

        })
      })
    }
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPartner({ ...partner, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // Validaciones
      if (partner.partnerId.length < 10 || partner.partnerId.length > 20) {
        setPartner({
          ...partner,
          error: 'El número de documento debe tener entre 11 y 14 caracteres'
        })
        return
      }
      if (!partner.email.includes('@') || !partner.email.includes('.')) {
        setPartner({ ...partner, error: 'Debe ingresar un email válido' })
        return
      }

      // Enviar solicitud
      if (id) {
        const actualizando = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/partner/${id}`, partner)
        console.log(actualizando)
      } else {
        const creando = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/partner`,
          partner
        )
        console.log(creando)
      }

      navigate('/parnert/parnertsList')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mt-5 p-5">
      <Form onSubmit={handleSubmit}>
        {partner.error && <p>{partner.error}</p>}
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={partner.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={partner.lastName }
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="documentType">
          <Form.Label>Tipo de documento</Form.Label>
          <Form.Control
            as="select"
            name="documentType"
            value={partner.documentType}
            onChange={handleInputChange}
          >
            <option value="CC">CC</option>
            <option value="NIT">NIT</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="partnerId">
          <Form.Label>ID de Partner</Form.Label>
          <Form.Control
            type="number"
            name="partnerId"
            value={partner.partnerId}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={partner.phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={partner.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={partner.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Tipo de partner</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={partner.type}
            onChange={handleInputChange}
          >
            <option value="CLIENTE">Cliente</option>
            <option value="DISTRIBUIDOR">Distribuidor</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-5">
          {edit ? 'Actualizar Partner' : 'Crear Partner' }
        </Button>
      </Form>
    </div>
  )
}

export default CreatePartner
