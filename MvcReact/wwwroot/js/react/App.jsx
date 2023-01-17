import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar.jsx";
import Customer from "./features/Customer.jsx";
import Home from "./features/Home.jsx";
import Product from "./features/Product.jsx";
import Sale from "./features/Sale.jsx";
import Store from "./features/Store.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ margin: "20px" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/customer" element={<Customer />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/store" element={<Store />} />
          <Route exact path="/sale" element={<Sale />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
