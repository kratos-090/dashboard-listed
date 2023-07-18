import React from "react";
import ReactDOM from "react-dom/client";
import { MainApp } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";



ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-repojrd7hu81fdom.us.auth0.com"
    clientId="QDNNRs8dc9NMCI75t4YD6VcuhsGafjaO"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/dashboard/",
    }}>
    <MainApp />
  </Auth0Provider>
);
