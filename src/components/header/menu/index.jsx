import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const activeStyle = { color: "#82c7e0" };

class Menu extends Component {
  render() {
    return (
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
    );
  }
}

export default Menu;
