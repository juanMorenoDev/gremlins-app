import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const ClientsList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await axios.get('http://localhost:3001/partner');  
      console.log("res",response.data)
      const filteredClients = response.data.filter(client => client.type === 'CLIENTE');
      setClients(filteredClients);
    };
    fetchClients();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Lista de Clientes</h1>
      {clients.length > 0 ? (
        clients.map(client => (
          <Card key={client.partnerId} className="mb-3">
            <Card.Body>
            <Card.Title>ID: {client.partnerId}</Card.Title>
              <Card.Title>Nombres: {client.name} {client.lastName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Email: {client.email}</Card.Subtitle>
              <Card.Text>Teléfono: {client.phone}</Card.Text>
              <Card.Text>Dirección: {client.address}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center">No hay clientes registrados.</p>
      )}
    </div>
  );
};

export default ClientsList;
