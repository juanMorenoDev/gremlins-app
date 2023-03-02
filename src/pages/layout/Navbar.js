import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar bg="dark " variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ padding: "5px" }}>
              Gremlins
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" style={{ padding: "5px" }}>
              Home
            </Link>

            <Link to="login" style={{ padding: "5px" }}>
              Login
            </Link>

            <Link to="parnert/register" style={{ padding: "5px" }}>
              Registrar parnert
            </Link>

            <Link to="parnert/parnertsList" style={{ padding: "5px" }}>
              Lista de parnerts
            </Link>
            <Link to="products/productsList" style={{ padding: "5px" }}>
              Lista de productos
            </Link>

            {/*<Nav.Link>
              <Link to="/">Panel de Control</Link>
            </Nav.Link>*/}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
