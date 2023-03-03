import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {user} from "../../redux/store"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {
const user  = useSelector((state) => state.user);


  return (
    <Navbar bg="dark" fixed="bottom" >
      <Container>
        <Navbar.Brand>
         <Link to="/"  >
          Home
         </Link> 
        </Navbar.Brand>
        <Navbar.Text>
          {user.role === "RECEPCIONISTA" &&
          <Link to="parnert/register">
          Crear Parnert
          </Link>}
          <Link to="products/register">
          Crear Producto
          </Link>
        </Navbar.Text>
        
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Logueado como: <a href="#login">Jhon</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;