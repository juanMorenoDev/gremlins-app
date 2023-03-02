import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const PartnersList = () => {
  // Estado para almacenar la lista de Partners
  const [partners, setPartners] = useState([]);

  // Función para obtener la lista de Partners desde el servidor

  
  const fetchPartners = async () => {
    try {
      const response = await axios.get("http://localhost:3001/partner");
      setPartners(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para eliminar un Partner
  const deletePartner = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/parnert/${id}`);
      // Actualizamos la lista de Partners
      const newPartners = partners.filter((partner) => partner.id !== id);
      setPartners(newPartners);
    } catch (error) {
      console.log(error);
    }
  };

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
                <Button variant="info" size="sm">
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deletePartner(partner.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  useEffect(() => {
    fetchPartners();
  }, [partners]);

  return (
    <div>
      <h1>Lista de Partners</h1>
      {renderPartnersTable()}
    </div>
  );
};

export default PartnersList;
