// products context
import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
const ProductContext = React.createContext();

//Provider, Consumer, useContext()

function ProductProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get(`${url}/products`).then((response) => {
      setProducts(response.data);
    });
    return () => {};
  }, []);

  return (
    <ProductContext.Provider value={{ loading, products, featured }}>
      {children}
    </ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };
