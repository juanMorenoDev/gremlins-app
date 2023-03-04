import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setPartner } from "../../redux/reducer/partner/partnerSlice";

const LoginPartner = () => {
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
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
        .post("http://localhost:3001/partner/login", {
          email: email,
        })
        .then(({ data }) => {
          // Aquí puedes redirigir al usuario a la página principal de la aplicación
          localStorage.setItem(
            "partner",
            JSON.stringify({
              partnerId: data.partner.partnerId,
              name: data.partner.name,
              type: data.partner.type,
              email: data.partner.email,

            })
          )
          dispatch(setPartner({
            _id: data.partner._id,
            name: data.partner.name,
            lastName: data.partner.lastName,
            documentType: data.partner.documentType,
            partnerId: data.partner.partnerId,
            phone: data.partner.phone,
            address: data.partner.address,
            email: data.partner.email,
            type: data.partner.type,
          }))
          navigate("/home")
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  /*const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };*/

  return (
    <div className="align-items-center">

      <Form noValidate validated={validated} onSubmit={handleSubmit} >
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

        {/*<Form.Group controlId="formBasicPassword">
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
  </Form.Group>*/}

        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
    </div>
  );
};

export default LoginPartner;
