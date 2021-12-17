import React, { Component } from "react";
import { connect } from "react-redux";

import { switchDailyTasksVisibility } from "../../../../actions/taskActions";

import TaskList from "../task-list";
import "./style.css";

const tabsConfig = [
  {
    title: "To Do",
    state: "todo"
  },
  {
    title: "Done",
    state: "done"
  }
];

class DailyTaskList extends Component {
  constructor(props) {
    super(props);
    this.handleTabsClick = this.handleTabsClick.bind(this);
  }

  handleTabsClick(e) {
    const { state } = e.target.dataset;
    this.props.switchDailyTasksVisibility(state);
  }

  render() {
    const { tasks, dailyTasksVisibility } = this.props;
    let visibleTasks = {};

    for (let key in tasks) {
      if (dailyTasksVisibility === "todo") {
        // tasks[key]['id'] = key;
        if (!tasks[key]["isGlobal"] && !tasks[key]["isDone"])
          visibleTasks[key] = tasks[key];
      }
      if (dailyTasksVisibility === "done") {
        if (!tasks[key]["isGlobal"] && tasks[key]["isDone"])
          visibleTasks[key] = tasks[key];
      }
    }

    return (
      <section
        className={`daily-task-list ${
          this.props.dailyTasksVisibility === "done" ? "task-list--done" : null
        }`}
      >
        <div className="daily-task-list__top">
          <ul className="task-list-tabs task-list-tabs--fulfillment">
            {tabsConfig.map(item => {
              let activeClass = "";
              if (this.props.dailyTasksVisibility === item.state)
                activeClass = "task-list-tabs__item--active";

              return (
                <li
                  key={item.title}
                  data-state={item.state}
                  className={`task-list-tabs__item ${activeClass}`}
                  onClick={this.handleTabsClick}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
          <ul className="task-list-tabs task-list-tabs--remove">
            <li className="task-list-tabs__item">
              <a data-action="select" className="task-list-tabs__link">
                Select All
              </a>
            </li>
            <li className="task-list-tabs__item">
              <a data-action="deselect" className="task-list-tabs__link">
                Deselect All
              </a>
            </li>
          </ul>
        </div>

        <TaskList isDaily={true} tasks={visibleTasks} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  dailyTasksVisibility: state.tasks.dailyTasksVisibility
});

export default connect(
  mapStateToProps,
  { switchDailyTasksVisibility }
)(DailyTaskList);
