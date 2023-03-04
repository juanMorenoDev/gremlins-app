import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreatePartner from './components/partners/CreatePartner'
import PartnersList from './components/partners/PartnersList'
import OrdersList from './components/orders/OrdersList'
import ProductsList from './components/products/ProductsList'
import Layout from './pages/layout/Layout'

import Home from './pages/Home'
import CreateUser from './components/users/CreateUsers'
import CreateProduct from './components/products/CreateProduct'
import LoginForm from './components/LoginForm'
import LoginPartner from './components/partners/LoginPartner'

function App () {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/newuser" element={<CreateUser />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="home" element={<Home />} />
        <Route path="loginpartner" element={<LoginPartner />} />
        <Route path="partner/register" element={<CreatePartner />} />
        <Route path="partner/register/:id" element={<CreatePartner />} />
        <Route path="partners" element={<PartnersList type="DISTRIBUIDOR" />} />
        <Route path="clients" element={<PartnersList type="CLIENTE" />} />
        <Route path="products/register" element={<CreateProduct />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="products" element={<ProductsList />} />
      </Route>
    </Routes>

  )
}

export default App
