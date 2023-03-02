import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Navbar bg="dark" fixed="bottom" >
      <Container>
        <Navbar.Brand>
         <Link to="/"  >
          Home
         </Link> 
        </Navbar.Brand>
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