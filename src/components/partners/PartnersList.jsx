import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PartnersList = () => {
  // Estado para almacenar la lista de Partners
  const [partners, setPartners] = useState([])
  console.log(partners)
  /* const [editar, setEditar] = useState({
    editar: false,
    partnerId: null,
  }) */
  // const navigate = useNavigate();

  // Función para obtener la lista de Partners desde el servidor

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/partner`)
      console.log(response.data)
      setPartners(response.data)
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

  /* const editPartner = async (id) => {
    console.log("miid", id);
    navigate("/home");

    /*
    setEditar({
      editar: true,
      partnerId: editar,
    })
    const partner = partners.find((partner) => partner.id === id);
    if (!partner) {
      return Promise.reject(`Partner with id ${id} not found`);
    }

    return axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/partner/${id}`, partner)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error));

  }; */

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
                <Link to={`/partner/register/${partner._id}`}>
                  <Button
                    variant="info"
                    size="sm"
                    /*                 onClick={() => //editPartner(partner._id, console.log("ir")

                  } */
                  >
                    Editar
                  </Button>
                </Link>{' '}
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
      <h1>Lista de Partners</h1>
      {renderPartnersTable()}
    </div>
  )
}

export default PartnersList
