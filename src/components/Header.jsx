import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { setRemoveMode } from "../actions/taskActions";
import logo from "../assets/img/Logo.svg";
import "./Header.scss";

const activeStyle = { color: "#82c7e0" };

class Header extends Component {
  constructor(props) {
    super(props);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  onRemoveClick() {
    const { isRemoveMode } = this.props;
    this.props.setRemoveMode(!isRemoveMode);
  }

  render() {
    const { isRemoveMode } = this.props;

    return (
      <header className="header">
        <div className="content">
          <a href="/">
            <img src={logo} className="logo-img" alt="Productivity tracker" />
          </a>
          <ul className="menu">
            {this.props.location.pathname === "/" ? (
              <li className="menu__item menu__item--remove">
                <a
                  onClick={this.onRemoveClick}
                  className="icon-trash menu__link"
                  style={isRemoveMode ? activeStyle : null}
                />
              </li>
            ) : null}
            <li className="menu__item">
              <NavLink activeStyle={activeStyle} exact to={"/"} className="menu__link icon-list" />
            </li>
            <li className="menu__item">
              <NavLink
                activeStyle={activeStyle}
                to={"/report"}
                className="menu__link icon-statistics"
              />
            </li>
            <li className="menu__item">
              <NavLink
                activeStyle={activeStyle}
                to={"/settings"}
                className="menu__link icon-settings"
              />
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  isRemoveMode: state.tasks.isRemoveMode,
});

export default connect(mapStateToProps, { setRemoveMode })(withRouter(Header));
