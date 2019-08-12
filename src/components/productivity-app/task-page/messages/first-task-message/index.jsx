import React, { Component } from "react";
import img from "./tomato-add.svg";

class FirstTaskMessage extends Component {
  render() {
    return (
      <section id="message-add-first-task" className="task-page-message">
        <img src={img} className="task-page-message__img" alt="tomato_add" />
        <p className="task-page-message__paragraph">Add your first task</p>
      </section>
    );
  }
}

export default FirstTaskMessage;
