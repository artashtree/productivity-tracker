import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./store";

import "./assets/fonts/icomoon.eot";
import "./assets/fonts/icomoon.svg";
import "./assets/fonts/icomoon.ttf";
import "./assets/fonts/icomoon.woff";
import "./assets/styles/base.scss";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
