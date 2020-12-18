import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from "./Routing";
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import auth0Config from './utils/auth0_config'

ReactDOM.render(
  <Auth0Provider {...auth0Config} >
    <Routing />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
