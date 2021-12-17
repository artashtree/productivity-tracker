import React, { Component } from "react";
import "./style.scss";
import logo from "./Logo.svg";
import Menu from "./menu";
import { connect } from "react-redux";
import { fetchTasks } from "../../../actions/taskActions";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="content">
          <a href="/" className="logo">
            <img src={logo} className="logo__img" alt="Productivity tracker" />
          </a>
          <Menu />
        </div>
      </header>
    );
  }
}

export default Header;
