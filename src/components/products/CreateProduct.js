import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    partnerId: '',
    name: '',
    quantity: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validamos los campos requeridos
    if (!product.partnerId || !product.name || !product.quantity) {
      setError('Por favor ingrese todos los campos requeridos.');
      return;
    }

    // Validamos que la cantidad sea un número positivo
    if (product.quantity <= 0) {
      setError('La cantidad debe ser un número positivo.');
      return;
    }

    // Enviamos la información del formulario al servidor
    try {
      const response = await axios.post('http://localhost:3001/product', product);
      console.log(response.data);
      // limpiamos el formulario después de enviar la información al servidor
      setProduct({
        partnerId: '',
        name: '',
        quantity: ''
      });
      setError('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear Producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Partner ID:</Form.Label>
          <Form.Control type="text" name="partnerId" value={product.partnerId} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" name="name" value={product.name} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Cantidad:</Form.Label>
          <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleInputChange} />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button type="submit" variant="primary">Crear</Button>
      </Form>
    </div>
  );
};

export default CreateProduct;
