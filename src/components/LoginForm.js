import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      axios
        .post("http://localhost:3001/user/login", {
          username: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          // Aquí puedes redirigir al usuario a la página principal de la aplicación
          localStorage.setItem(response.data.token)
          navigate("/products")
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Por favor ingrese un correo electrónico válido.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Por favor ingrese su contraseña.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default LoginForm;
