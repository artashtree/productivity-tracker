import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/Logo.svg";
import "./Header.scss";

const activeStyle = { color: "#82c7e0" };

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="content">
          <a href="/" className="logo">
            <img src={logo} className="logo__img" alt="Productivity tracker" />
          </a>
          <ul className="menu">
            <li className="menu__item menu__item--add">
              <a href="" className="icon-add menu__link open-dialog add-task-btn" />
            </li>
            <li className="menu__item menu__item--remove">
              <a href="" id="remove-mode-btn" className="icon-trash menu__link" />
            </li>
            <li className="menu__item">
              <NavLink activeStyle={activeStyle} exact to={"/"} className="icon-list menu__link" />
            </li>
            <li className="menu__item">
              <NavLink
                activeStyle={activeStyle}
                to={"/report"}
                className="icon-statistics menu__link"
              />
            </li>
            <li className="menu__item">
              <NavLink
                activeStyle={activeStyle}
                to={"/settings"}
                className="icon-settings menu__link"
              />
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
