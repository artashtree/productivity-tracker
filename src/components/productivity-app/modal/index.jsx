import React, { Component } from "react";
import ReactDOM from "react-dom";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRoot = document.getElementById("modal-root");
    this.el = document.createElement("div");
    this.el.className = "dialog-wrapper";
    this.body = document.body;
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
    this.body.classList.add("modal-window-active");
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
    this.body.classList.remove("modal-window-active");
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
