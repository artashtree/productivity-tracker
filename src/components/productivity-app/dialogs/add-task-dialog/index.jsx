import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";

import RadioControl from "../radio-control";
import { hideModal } from "../../../../actions/modalActions";

const categoryConfig = ["Work", "Education", "Hobby", "Sport", "Other"];
const priorityConfig = ["Urgent", "High", "Middle", "Low"];

class AddTaskDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: "",
        description: "",
        category: "work",
        deadline: "",
        estimation: 3,
        priority: "urgent",
        isDone: false,
        isGlobal: true
      }
    };

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleEstimationChange = this.handleEstimationChange.bind(this);
  }

  handleAddTask(e) {
    const { form } = this.state;
    const db = firebase.database();
    const dbRef = db.ref("tasks");
    dbRef.push(form);
    dbRef.on(
      "value",
      data => {
        if (!data.val()) console.error("Error. Cannot add task.");
      },
      err => console.error(err)
    );

    this.props.hideModal();
    e.preventDefault();
  }

  handleTextChange(e) {
    const { target } = e;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({ form });
  }

  handleRadioChange(e) {
    const { target } = e;
    const { form } = this.state;
    form[target.name] = target.id;
    this.setState({ form });
  }

  handleEstimationChange(e) {
    const { form } = this.state;
    form.estimation = e.target.value;
    this.setState({ form });
  }

  render() {
    const {
      title,
      description,
      category,
      deadline,
      estimation,
      priority
    } = this.state.form;

    return (
      <section className="dialog">
        <form onSubmit={this.handleAddTask}>
          <h1 className="dialog__heading">Add Task</h1>
          <ul className="dialog__list">
            <li className="dialog__list-item">
              <h2 className="dialog__list-item-title">Title</h2>
              <input
                id="add-task-title"
                className="dialog__text-input"
                type="text"
                name="title"
                placeholder="Add title here"
                value={title}
                onChange={this.handleTextChange}
                required="required"
              />
            </li>
            <li className="dialog__list-item">
              <h2 className="dialog__list-item-title">Description</h2>
              <input
                id="add-task-description"
                className="dialog__text-input"
                type="text"
                name="description"
                placeholder="Add description here"
                value={description}
                onChange={this.handleTextChange}
                required="required"
              />
            </li>
            <li className="dialog__list-item">
              <h2 className="dialog__list-item-title">Category</h2>
              {categoryConfig.map(item => {
                const id = item.toLowerCase();
                const checked = { checked: false };
                if (id === category) checked.checked = true;

                return (
                  <span key={`key-${id}`}>
                    <input
                      className={`dialog__radio-input dialog__radio-input--${id}`}
                      type="radio"
                      name="category"
                      id={id}
                      value={id}
                      {...checked}
                      onChange={this.handleRadioChange}
                    />
                    <label htmlFor={id} className="dialog__radio-label">
                      {item}
                    </label>
                  </span>
                );
              })}
            </li>
            <li className="dialog__list-item">
              <h2 className="dialog__list-item-title">Deadline</h2>
              <input
                id="add-task-deadline"
                className="dialog__text-input"
                type="date"
                value={deadline}
                name="deadline"
                onChange={this.handleTextChange}
                required="required"
              />
            </li>
            <li className="dialog__list-item">
              <h2 className="dialog__list-item-title">Estimation</h2>
              <RadioControl
                estimation={estimation}
                handleEstimationChange={this.handleEstimationChange}
              />
            </li>
            <li className="dialog__list-item">
              <h2 className="dialog__list-item-title">Priority</h2>
              {priorityConfig.map(item => {
                const id = item.toLowerCase();
                const checked = { checked: false };
                if (id === priority) checked.checked = true;

                return (
                  <span key={`key-${id}`}>
                    <input
                      className={`dialog__radio-input dialog__radio-input--${id}`}
                      type="radio"
                      name="priority"
                      id={id}
                      value={id}
                      {...checked}
                      onChange={this.handleRadioChange}
                    />
                    <label htmlFor={id} className="dialog__radio-label">
                      {item}
                    </label>
                  </span>
                );
              })}
            </li>
          </ul>
          <div className="dialog__controls">
            <button
              type="button"
              title="Close"
              className="icon-close dialog__close dialog__btn close-dialog"
              onClick={() => this.props.hideModal()}
            />
            <button
              type="submit"
              title="Add Task"
              className="icon-check dialog__check dialog__btn done-dialog"
            />
          </div>
        </form>
      </section>
    );
  }
}

export default connect(
  null,
  { hideModal }
)(AddTaskDialog);
