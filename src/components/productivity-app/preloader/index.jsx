import React, { Component } from "react";

import "./style.scss";

const Preloader = () => {
  return (
    <div className="lds">
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Preloader;
