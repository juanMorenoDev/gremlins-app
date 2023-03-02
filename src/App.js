import { Routes, Route } from "react-router-dom";
import CreatePartner from "./components/parnerts/CreateParnert";
import PartnersList from "./components/parnerts/ParnertsList";
import ProductsList from "./components/products/ProductsList";
import Layout from "./pages/layout/Layout";
import Login from "./pages/Login";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="parnert/register" element={<CreatePartner />} />
        <Route path="parnert/parnertsList" element={<PartnersList />} />
        <Route path="products/productsList" element={<ProductsList />} />
      </Route>
    </Routes>
  );
}

export default App;
