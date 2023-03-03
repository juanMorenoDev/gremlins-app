import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const CreateUser = () => {
  const [user, setUser] = useState({
    userId: "",
    password: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    role: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validaciones
    if (
      user.userId === "" ||
      user.password === "" ||
      user.name === "" ||
      user.email === "" ||
      user.role === ""
    ) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }
    if (!/^([0-9])*$/.test(user.userId)) {
      alert("El userID debe ser un número entero.");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(user.name) || !/^[a-zA-Z]+$/.test(user.lastName)) {
      alert("El nombre y el apellido solo deben contener letras.");
      return;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }
    // Enviar información al backend
    axios
      .post("http://localhost:3001/user/register", user)
      .then((response) => {
        setUser({
          userId: "",
          password: "",
          name: "",
          lastName: "",
          phone: "",
          email: "",
          address: "",
          role: "",
        });
        alert(`Binvenido ${user.name}`);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="container border- p-5" >
      <Form onSubmit={handleSubmit} className=" ">
        <Form.Group controlId="formUserID">
          <Form.Label>User ID *</Form.Label>
          <Form.Control
            type="text"
            name="userId"
            value={user.userId}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Role *</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="TRANSPORTADOR">Transportador</option>
            <option value="EMPACADOR">Empacador</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="RECEPCIONISTA">Recepcionista</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
