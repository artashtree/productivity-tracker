import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Timer from "./Timer";
import "./TimerPage.scss";

class TimerPage extends Component {
  render() {
    const { task, id } = this.props;

    if (!id) {
      this.props.history.push("/");

      return null;
    }

    if (!task) {
      return null;
    }

    const { title, description } = task;

    return (
      <main className="main">
        <div className="content">
          <h1 className="heading">{title}</h1>
          <p className="paragraph">{description}</p>
          <section className="timer">
            <Timer />
            <section className="timer__controls">
              <button
                className="timer__arrow--prev timer__arrow"
                onClick={() => this.props.history.push("/")}
              >
                <i className="icon-arrow-left timer__icon" />
                <span className="tooltip">Go to Global List</span>
              </button>
              <button
                className="timer__arrow--next timer__arrow"
                onClick={() => this.props.history.push("/report")}
              >
                <i className="icon-arrow-right timer__icon" />
                <span className="tooltip">Go to Report</span>
              </button>
            </section>
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.timer.id,
    task: state.timer.task,
  };
};

export default connect(mapStateToProps, null)(withRouter(TimerPage));
