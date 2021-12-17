import React, { Component } from "react";
import { Provider } from "react-redux";

import ProductivityApp from "./components/productivity-app";
import store from "./store";

import "./assets/fonts/icomoon.eot";
import "./assets/fonts/icomoon.svg";
import "./assets/fonts/icomoon.ttf";
import "./assets/fonts/icomoon.woff";
import "./assets/styles/base.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ProductivityApp />
      </Provider>
    );
  }
}

export default App;
