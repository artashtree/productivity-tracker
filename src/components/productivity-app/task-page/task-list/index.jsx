import React, { Component } from "react";

import Task from "./task";
import "./style.scss";

class TaskList extends Component {
  render() {
    const { tasks, isDaily } = this.props;

    return (
      <ul className={`task-list`}>
        {tasks &&
          Object.keys(tasks).map(id => (
            <Task
              task={tasks[id]}
              isDaily={isDaily}
              key={id}
              id={id}
            />
          ))}
      </ul>
    );
  }
}

export default TaskList;
