import React, { Component } from "react";
import emptyTomato from "../assets/img/empty-tomato.svg";
import fillTomato from "../assets/img/fill-tomato.svg";
import failedTomato from "../assets/img/tomato-failed.svg";
import "./Pomodoros.scss";

class Pomodoros extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pomodoros } = this.props;

    return (
      <ul className="timer__pomodoro">
        {pomodoros.map((p) => {
          if (p.failed) {
            return (
              <li className="timer__pomodoro-item" key={p.index}>
                <img
                  src={failedTomato}
                  className="timer__failed-tomato timer__pomodoro-img"
                  alt=""
                />
              </li>
            );
          }

          if (p.finished) {
            return (
              <li className="timer__pomodoro-item" key={p.index}>
                <img src={fillTomato} className="timer__fill-tomato timer__pomodoro-img" alt="" />
              </li>
            );
          }

          return (
            <li className="timer__pomodoro-item" key={p.index}>
              <img src={emptyTomato} className="timer__empty-tomato timer__pomodoro-img" alt="" />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Pomodoros;
