import React from "react";
import { Switch, Route } from "react-router-dom";

import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/products" exact component={Products} />
        <Route
          path="/products/:id"
          children={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />

        <Route component={Error} />
      </Switch>
    </>
  );
}
