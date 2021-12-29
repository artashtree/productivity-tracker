import React, { Component } from "react";
import { connect } from "react-redux";
import { switchGlobalTasksVisibility } from "../../actions/taskActions";
import TaskList from "./TaskList";

const tabsConfig = [
  {
    title: "All",
    state: "all",
  },
  {
    title: "Urgent",
    state: "urgent",
  },
  {
    title: "High",
    state: "high",
  },
  {
    title: "Middle",
    state: "middle",
  },
  {
    title: "Low",
    state: "low",
  },
];

class GlobalTaskList extends Component {
  constructor(props) {
    super(props);
    this.handleTabsClick = this.handleTabsClick.bind(this);
  }

  handleTabsClick(e) {
    const { state } = e.target.dataset;
    this.props.switchGlobalTasksVisibility(state);
  }

  doesCategoryExist(category) {
    const { tasks } = this.props;
    let exists;
    Object.keys(tasks).map((key) => {
      if (tasks[key]["category"] === category) exists = true;
    });
    return exists;
  }

  render() {
    const { tasks, globalTasksVisibility } = this.props;
    const workTasks = {},
      educationTasks = {},
      hobbyTasks = {},
      sportTasks = {},
      otherTasks = {};
    const visibleTasks = {};

    // filter by priority
    for (let key in tasks) {
      if (globalTasksVisibility === "all") {
        visibleTasks[key] = tasks[key];
      } else if (tasks[key]["priority"] === globalTasksVisibility) {
        visibleTasks[key] = tasks[key];
      }
    }

    // filter by category
    for (let key in visibleTasks) {
      switch (tasks[key]["category"]) {
        case "work":
          workTasks[key] = tasks[key];
          break;
        case "education":
          educationTasks[key] = tasks[key];
          break;
        case "hobby":
          hobbyTasks[key] = tasks[key];
          break;
        case "sport":
          sportTasks[key] = tasks[key];
          break;
        case "other":
          otherTasks[key] = tasks[key];
          break;
        default:
          console.log("Category is missing...");
      }
    }

    return (
      <section className="global-task-list">
        <section className="global-task-list__top">
          <h1 className="global-task-list__btn">
            Global list
            <i className="icon-global-list-arrow-down global-task-list__icon-down global-task-list__icon" />
            <span className="tooltip">Go to Global List</span>
          </h1>

          <ul className="task-list-tabs task-list-tabs--priority">
            {tabsConfig.map((item) => {
              let activeClass = "";
              if (this.props.globalTasksVisibility === item.state)
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

          <ul className="task-list-tabs task-list-tabs--remove task-list-tabs--remove-global">
            <li className="task-list-tabs__item">Select All</li>
            <li className="task-list-tabs__item">Deselect All</li>
          </ul>
        </section>

        <div>
          {Object.keys(workTasks).length > 0 && (
            <section className="global-task-section global-task-section--work">
              <h1 className="global-task-section__heading">Work</h1>
              <TaskList tasks={workTasks} handleEditTask={this.props.handleEditTask} />
            </section>
          )}
          {Object.keys(educationTasks).length > 0 && (
            <section className="global-task-section global-task-section--education">
              <h1 className="global-task-section__heading">Education</h1>
              <TaskList tasks={educationTasks} handleEditTask={this.props.handleEditTask} />
            </section>
          )}
          {Object.keys(hobbyTasks).length > 0 && (
            <section className="global-task-section global-task-section--hobby">
              <h1 className="global-task-section__heading">Hobby</h1>
              <TaskList tasks={hobbyTasks} handleEditTask={this.props.handleEditTask} />
            </section>
          )}
          {Object.keys(sportTasks).length > 0 && (
            <section className="global-task-section global-task-section--sport">
              <h1 className="global-task-section__heading">Sport</h1>
              <TaskList tasks={sportTasks} handleEditTask={this.props.handleEditTask} />
            </section>
          )}
          {Object.keys(otherTasks).length > 0 && (
            <section className="global-task-section global-task-section--other">
              <h1 className="global-task-section__heading">Other</h1>
              <TaskList tasks={otherTasks} handleEditTask={this.props.handleEditTask} />
            </section>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  globalTasksVisibility: state.tasks.globalTasksVisibility,
});

export default connect(mapStateToProps, { switchGlobalTasksVisibility })(GlobalTaskList);
