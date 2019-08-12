import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import firebase from "firebase";

import Pomodoros from "../pomodoros";
import "./style.scss";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerStyle: {},
      fillerStyle: {},
      maskStyle: {},
      isWork: false,
      isBreak: false,
      isOver: false,
      timeCounter: 0,
      iterationCounter: 1,
      pomodoros: []
    };

    this.startIteration = this.startIteration.bind(this);
    this.startBreak = this.startBreak.bind(this);
    this.setCounter = this.setCounter.bind(this);
    this.finishTask = this.finishTask.bind(this);
    this.failPomodora = this.failPomodora.bind(this);
    this.finishPomodora = this.finishPomodora.bind(this);

    this.interval = null;
    this.timeout = null;
  }

  componentDidMount() {
    const { workTime } = this.props.settings;
    const { task } = this.props;

    const pomodoros = [];
    let estimation = 0;

    if (task) {
      estimation = parseInt(this.props.task.estimation);

      for (let i = 1; i <= estimation; i++) {
        pomodoros.push({ index: i, failed: false, finished: false });
      }

      this.setState({
        timeCounter: workTime,
        pomodoros
      });
    }
  }

  componentDidUpdate() {
    const { isWork, isBreak, isOver } = this.state;
    const { id, task } = this.props;

    if (!isBreak && !isWork && isOver) {
      // switch isDone flag in DB
      task.isDone = true;

      const db = firebase.database();
      const dbRef = db.ref(`tasks/${id}`);
      dbRef.set(task);
      dbRef.once("value", null, err => console.error(err));
    }
  }

  startIteration() {
    console.log("startIteration");
    const { workTime } = this.props.settings;

    const time = workTime;
    const isWork = true;
    const isOver = false;
    const isBreak = false;

    const spinnerStyle = { animation: `rota ${time}s linear 1 forwards` };
    const fillerStyle = { animation: `opa ${time}s steps(1, end) 1 reverse forwards` };
    const maskStyle = { animation: `opa ${time}s steps(1, end) 1 forwards` };

    clearTimeout(this.timeout);
    clearInterval(this.interval);

    // start work
    this.setState(
      {
        spinnerStyle,
        fillerStyle,
        maskStyle,
        isWork,
        isOver,
        isBreak,
        timeCounter: workTime
      },
      () => {
        this.interval = this.setCounter();
        this.timeout = setTimeout(() => this.startBreak(), time * 1000);
      }
    );
  }

  startBreak() {
    console.log("startBreak");
    const { shortBreak, longBreak, workIteration, workTime } = this.props.settings;
    let { iterationCounter } = this.state;

    const time =
      iterationCounter == workIteration
        ? longBreak
        : iterationCounter == workIteration * 2
        ? null
        : shortBreak; // * 60

    this.finishPomodora();

    if (!time) {
      this.finishTask();

      return;
    }

    clearTimeout(this.timeout);
    clearInterval(this.interval);

    const isWork = false;
    const isBreak = true;
    const isOver = false;

    const spinnerStyle = { animation: `rota2 ${time}s linear 1 forwards` };
    const fillerStyle = { animation: `opa2 ${time}s steps(1, end) 1 reverse forwards` };
    const maskStyle = { animation: `opa2 ${time}s steps(1, end) 1 forwards` };

    this.setState(
      {
        spinnerStyle,
        fillerStyle,
        maskStyle,
        isWork,
        isOver,
        isBreak,
        iterationCounter: iterationCounter + 1,
        timeCounter: time
      },
      () => {
        this.interval = this.setCounter();

        this.timeout = setTimeout(() => {
          // finish break
          console.log("finishBreak");
          this.setState(
            {
              isWork: false,
              isOver: true,
              isBreak: true,
              timeCounter: workTime
            },
            () => clearInterval(this.interval)
          );
        }, time * 1000);
      }
    );
  }

  setCounter() {
    return setInterval(() => {
      let { timeCounter } = this.state;
      timeCounter -= 1;

      this.setState({ timeCounter });
      if (timeCounter <= 1) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  finishTask() {
    const isWork = false;
    const isBreak = false;
    const isOver = true;

    const spinnerStyle = { animation: `rota2 0.01s linear 1 forwards` };
    const fillerStyle = { animation: `opa2 0.01s steps(1, end) 1 reverse forwards` };
    const maskStyle = { animation: `opa2 0.01s steps(1, end) 1 forwards` };

    this.setState({
      isWork,
      isBreak,
      isOver,
      spinnerStyle,
      fillerStyle,
      maskStyle
    });

    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }

  failPomodora() {
    const { iterationCounter, pomodoros } = this.state;
    pomodoros.map(p => {
      if (p.index === iterationCounter) {
        p.failed = true;
      }
      return p;
    });

    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.startBreak();
  }

  finishPomodora() {
    const { iterationCounter, pomodoros } = this.state;
    pomodoros.map(p => {
      if (p.index === iterationCounter) {
        p.finished = true;
      }
      return p;
    });
  }

  render() {
    const {
      spinnerStyle,
      fillerStyle,
      maskStyle,
      isWork,
      isBreak,
      isOver,
      timeCounter,
      pomodoros
    } = this.state;

    const { priority } = this.props.task;

    return (
      <div>
        <Pomodoros pomodoros={pomodoros} />

        <section className={`timer__container timer__container--priority-${priority}`}>
          {/* Spinner: */}

          <div className="timer__wrapper">
            <div className="pie spinner" style={spinnerStyle} />
            <div className="pie filler" style={fillerStyle} />
            <div className="mask" style={maskStyle} />
          </div>

          {/* Messages: */}

          {!isWork && !isBreak && !isOver && (
            <div className="timer__message timer__message--initial">Let's do it!</div>
          )}

          {isBreak && isOver && (
            <div className="timer__message timer__message--break-over">Break is over</div>
          )}
          {!isBreak && !isWork && isOver && (
            <div className="timer__message timer__message--task-completed">You Completed Task</div>
          )}
          <div className="timer__message timer__message--time">
            {isBreak && !isOver && <span className="timer__message--time-status">Break</span>}
            {(isWork || isBreak) && !isOver && (
              <span className="timer__message--time-digits">{timeCounter}</span>
            )}
            {(isWork || isBreak) && !isOver && (
              <span className="timer__message--time-units">min</span>
            )}
          </div>
        </section>

        {/* Buttons: */}

        <section className="buttons">
          {!isWork && !isBreak && !isOver && (
            <button className="buttons__btn buttons__btn--green" onClick={this.startIteration}>
              Start
            </button>
          )}
          {isWork && !isOver && (
            <div>
              <button className="buttons__btn buttons__btn--red" onClick={this.failPomodora}>
                Fail Pomodora
              </button>
              <button className="buttons__btn buttons__btn--green" onClick={this.startBreak}>
                Finish Pomodora
              </button>
            </div>
          )}
          {!isWork && isBreak && (
            <div>
              <button className="buttons__btn buttons__btn--blue" onClick={this.finishTask}>
                Finish Task
              </button>
              <button className="buttons__btn buttons__btn--green" onClick={this.startIteration}>
                Start Pomodora
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.timer.id,
    task: state.timer.task,
    settings: state.settings.items
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(Timer));
