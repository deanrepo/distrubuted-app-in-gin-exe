import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Auth0Provider
    domain="dev-bzk452ux.us.auth0.com"
    clientId="dOxs78BtCGTBsvY9WDRBUbxO5jH3iyl6"
    redirectUri="http://localhost">
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);

