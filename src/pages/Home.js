import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClientsList from "../components/parnerts/GetClients";
import PartnersList from "../components/parnerts/ParnertsList";
import ProductsList from "../components/products/ProductsList";

function Home() {
  const user = useSelector((state) => state.user);
  const { role } = user;
  const { type, name } = useSelector((state) => state.partner);
  const navigate = useNavigate();
  //const [roleUser, setRoleUser] = useState(role);
  //const navigate = useNavigate()
  console.log("role", role);
  console.log("par", type);

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className="container p-5 mt-5">
      <div>
        <Card>
          <Card.Body className="text-center">
            {" "}
            Welcome {(role && user.name) || (type && name)}{" "}
          </Card.Body>
        </Card>
      </div>
      <div>
        {role === "RECEPCIONISTA" ? (
          <PartnersList />
        ) : role === "EMPACADOR" ? (
          <ClientsList />
        ) : role === "ADMINISTRADOR" ? (
          <>
            <PartnersList />
            <br />
            <ClientsList />
          </>
        ) : (type === "CLIENTE")||(type==="DISTRIBUIDOR") ? (
          <>
            <ProductsList />
          </>
        ) : (
          <h1>NO TIENES PERMISOS PARA VER ESTA PAGINA</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
