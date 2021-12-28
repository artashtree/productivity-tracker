import React, { Component } from "react";

class DragFirstTaskMessage extends Component {
  render() {
    return (
      <section className="task-page-message">
        <p className="task-page-message__paragraph">Task added, drag it to the top 5 in daily task list</p>
        <i className="task-page-message__icon-circle icon-arrow_circle"></i>
      </section>
    );
  }
}

export default DragFirstTaskMessage;
