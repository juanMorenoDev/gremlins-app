import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  // Obtenemos la lista de productos desde el servidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/product");
        console.log("r",response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  console.log("1",products)
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Productos</h2>
      <div className="row">
        {products.map((product) => (
          
          <div key={product._id} className="col-sm-6 col-lg-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>Partner ID:</strong> {product._id}
                  <br />
                  <strong>Cantidad:</strong> {product.quantity}
                </Card.Text>
                <Button variant="primary">Editar</Button>
                <Button variant="danger" className="ml-2">
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
