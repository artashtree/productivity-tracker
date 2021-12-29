import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase";
import { showModal } from "../../actions/modalActions";
import { setTimer } from "../../actions/timerActions";
import "./Task.scss";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


class Task extends Component {
  constructor(props) {
    super(props);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.database = firebase.database();
  }
  
  onRemoveClick(event) {
    event.preventDefault();

    const ref = this.database.ref(`tasks/${this.props.id}`);
    ref.set({});
    ref.on('value', () => console.log(`${this.props.id} removed`), () => console.error('error removing task'));
  }

  moveGlobalTask(id) {
    const db = firebase.database();
    const dbRef = db.ref(`tasks/${id}`);
    dbRef.on(
      "value",
      (data) => {
        const task = data.val();
        task.isGlobal = false;
        dbRef.set(task);
        dbRef.once("value", null, (err) => console.error(err));
      },
      (err) => console.error(err)
    );
  }

  generateDate(date) {
    let today = new Date();
    let deadline = new Date(date);
    let day = deadline.getDate();
    let month = monthNames[deadline.getMonth()];

    today = "" + today.getFullYear() + today.getMonth() + today.getDate();
    deadline = "" + deadline.getFullYear() + deadline.getMonth() + deadline.getDate();

    return today === deadline
      ? null
      : {
          day,
          month,
        };
  }

  handleTimerClick() {
    const { id, task } = this.props;
    this.props.setTimer(id, task);
    this.props.history.push("/timer");
  }

  render() {
    const { isDaily, task, isRemoveMode } = this.props;
    const date = this.generateDate(task.deadline);
    let liClassName = `task-list__item task-list__item--priority-${task["priority"]}  task-list__item--category-${task["category"]}`;
    // liClassName += task.isDone ? ' task-list__item--done' : '';

    return (
      <li className={liClassName}>
        <div className="task-list__left-block">
          {!isRemoveMode ? (
            <div className="task-list__date-block">
              {date ? (
                <span className="task-list__date">
                  <strong className="task-list__day">{date.day}</strong>
                  <span className="task-list__month">{date.month}</span>
                </span>
              ) : (
                <span className="task-list__today">Today</span>
              )}
            </div>
          ) : (
            <div className="task-list__remove-block">
              <a 
                onClick={this.onRemoveClick}
                className="task-list__remove-btn task-list__remove-btn--trash">
                <span className="task-list__remove-icon">
                  <i className="icon-trash" />
                </span>
              </a>
              {/* <a className="task-list__remove-btn task-list__remove-btn--close">
              <span className="task-list__remove-icon">
                <i className="icon-close" />
              </span>
            </a> */}
            </div>
          )}
        </div>
        <div className="task-list__description">
          <h1 className="task-list__heading">{task["title"]}</h1>
          <p className="task-list__text">{task["description"]}</p>
        </div>
        <div className="task-list__edit-block">
          {!isDaily && (
            <button
              className="icon-arrows-up task-list__up-btn"
              onClick={() => this.moveGlobalTask(this.props.id)}
            />
          )}
          <button
            className="icon-edit task-list__edit-btn"
            onClick={() => this.props.showModal("editTask", this.props.id)}
          />
        </div>
        <div className="task-list__right-block">
          <button
            className="task-list__timer-btn"
            disabled={!isDaily || task.isDone}
            onClick={this.handleTimerClick}
          >
            <span className="task-list__icon-holder">
              <span className="task-list__estimation">{task["estimation"]}</span>
              <i className="icon-tomato task-list__icon-tomato" />
              <i className="icon-timer task-list__icon-timer" />
            </span>
          </button>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRemoveMode: state.tasks.isRemoveMode,
  };
};

export default connect(mapStateToProps, { showModal, setTimer })(withRouter(Task));
