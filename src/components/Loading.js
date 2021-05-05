import React from "react";
import loading from "../assets/loading.gif";
export default function Loading() {
  return (
    <div className="loading">
      <h2>Cargando...</h2>
      <img src={loading} alt="loading gif" />
    </div>
  );
}
