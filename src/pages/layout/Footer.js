import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { user } from "../../redux/store";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navegation from "./Navegation";

function Footer() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const partner = useSelector((state) => state.partner);
  console.log(partner);

  return (
    <Navbar bg="dark" fixed="bottom">
      <Container>
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <div className="m-4">
          <Navegation />
        </div>
        <Navbar.Text>
          {user.role === "RECEPCIONISTA" && (
            <>
              <Link to="parnert/register" className="text-success p-3">
                Crear Parnert
              </Link>
              <Link to="products/register" className="text-success">
                Crear Producto
              </Link>
            </>
          )}
        </Navbar.Text>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="text-primary">
            Usuario:{" "}
            <span className="text-danger">
              {(user && user.name) || (partner && partner.name)}{" "}
            </span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;
