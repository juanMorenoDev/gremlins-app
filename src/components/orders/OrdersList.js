import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import EditOrderModal from "./EditOrderModal";
import axios from "axios";

const OrdersList = () => {
  // Estado para almacenar la lista de Orders
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener la lista de Orders desde el servidor
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/order");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para eliminar un Order
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/order/${id}`);
      // Actualizamos la lista de Orders
      fetchOrders()
    } catch (error) {
      console.error(error);
    }
  };

  const editOrder = (order) => {
    setIsModalOpen(true)
    setSelectedOrder(order)
  };

  const onClose = () => {
    setIsModalOpen(false)
    setSelectedOrder({})
    fetchOrders();
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-2">
      <h1>Lista de Ordenes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Orden N.</th>
            <th>Cliente</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Correo Electrónico</th>
            <th>Productos</th>
            <th>Fecha de entrega</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.clientId.firstName} {order.clientId.lastName}</td>
              <td>{order.clientId.documentType} {order.clientId.partnerId}</td>
              <td>{order.clientId.phone}</td>
              <td>{order.clientId.address}</td>
              <td>{order.clientId.email}</td>
              <td>
                <ul>

                  {
                    order.products.map(product => (
                      <li key={product._id}>{product.quantity} - {product.product.name}</li>
                    ))
                  }
                </ul>
              </td>
              <td>{order.deliveryDate}</td>
              <td>{order.status}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault()
                    editOrder(order)
                  }}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault()
                    deleteOrder(order._id)
                  }}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedOrder._id ? <EditOrderModal selectedOrder={selectedOrder} isOpen={isModalOpen} onClose={onClose}/> : '' }
    </div>
  );
};

export default OrdersList;
