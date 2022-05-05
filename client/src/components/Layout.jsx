import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./Authentication";
import { useGlobalContext } from "../context/GlobalContext";
import Dashboard from "./Dashboard";

function Layout() {
  const { fetchingUser } = useGlobalContext();

  return fetchingUser ? (
    <div className="auth container">
      <img className="loading" src={require("../images/loading.gif")} />
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Authentication />} />
        <Route path="/register" element={<Authentication register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
