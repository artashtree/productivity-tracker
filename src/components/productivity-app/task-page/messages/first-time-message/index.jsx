import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import img from "./tomato_settings.svg";

class FirstTimeMessage extends Component {
  render() {
    return (
      <section id="message-first-time" className="task-page-message">
        <img src={img} className="task-page-message__img" alt="tomato_settings" />
        <p className="task-page-message__paragraph">
          As you visited our site for a first time you can check and customize your default
          application settings
        </p>
        <div className="buttons">
          <button onClick={() => this.props.handleSkip()} className="buttons__btn buttons__btn--blue">
            Skip
          </button>
          <button
            onClick={() => this.props.history.push("/settings")}
            className="buttons__btn buttons__btn--green"
          >
            Go to Settings
          </button>
        </div>
      </section>
    );
  }
}

export default withRouter(FirstTimeMessage);
