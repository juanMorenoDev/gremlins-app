import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSelectedPartner } from '../../redux/reducer/partner/partnerSlice'

const PartnersList = ({ type }) => {
  const navigate = useNavigate()
  // Estado para almacenar la lista de Partners
  const [partners, setPartners] = useState([])
  const dispatch = useDispatch()
  console.log(partners)

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/partner`)
      console.log(response.data)
      const filteredPartners = response.data.filter(client => client.type === type)
      setPartners(filteredPartners)
    } catch (error) {
      console.log(error)
    }
  }

  // Función para eliminar un Partner
  const deletePartner = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/partner/${id}`)
      // Actualizamos la lista de Partners
      const newPartners = partners.filter((partner) => partner._id !== id)
      setPartners(newPartners)
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = (partner) => {
    navigate(`/partner/register/${partner._id}`)
    dispatch(setSelectedPartner(partner))
  }

  // Función para renderizar la tabla de Partners
  const renderPartnersTable = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Tipo de Documento</th>
            <th>Número de Documento</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Correo Electrónico</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <tr key={partner.partnerId}>
              <td>{partner.name}</td>
              <td>{partner.lastName}</td>
              <td>{partner.documentType}</td>
              <td>{partner.partnerId}</td>
              <td>{partner.phone}</td>
              <td>{partner.address}</td>
              <td>{partner.email}</td>
              <td>{partner.type}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => onEdit(partner)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deletePartner(partner._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  return (
    <div>
      <h1>Lista de { type === 'CLIENTE' ? 'Clientes' : 'Distribuidores'} </h1>
      {renderPartnersTable()}
    </div>
  )
}

export default PartnersList
