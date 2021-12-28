import React, { Component } from "react";
import { connect } from "react-redux";

import FirstTimeMessage from "./messages/first-time-message";
import FirstTaskMessage from "./messages/first-task-message";
import DragFirstTaskMessage from "./messages/drag-first-task-message";
import DailyTaskList from "./daily-task-list";
import GlobalTaskList from "./global-task-list";
import AddTaskDialog from "../dialogs/add-task-dialog";
import EditTaskDialog from "../dialogs/edit-task-dialog";
import Modal from "../modal";
import { showModal } from "../../actions/modalActions";
import Preloader from "../preloader";
import "./style.scss";

class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTimeMessage: false,
      firstTaskNessage: false
    };

    this.handleSkip = this.handleSkip.bind(this);
  }
  componentDidMount() {
    const prodappUserExists = localStorage.getItem("prodappUser");

    if (prodappUserExists) {
      this.setState({ firstTimeMessage: false, firstTaskMessage: true });
    } else {
      this.setState({ firstTimeMessage: true, firstTaskMessage: false });
      localStorage.setItem("prodappUser", true);
    }
  }

  getTasksForList(tasklist) {
    const { tasks } = this.props;
    const filteredTasks = {};

    Object.keys(tasks).map(key => {
      switch (tasklist) {
        case "daily":
          if (!tasks[key]["isGlobal"]) filteredTasks[key] = tasks[key];
          break;
        case "global":
          if (tasks[key]["isGlobal"]) filteredTasks[key] = tasks[key];
          break;
        default:
          console.err("Define task list to filter from...");
      }
    });
    return filteredTasks;
  }

  handleSkip() {
    this.setState({
      firstTimeMessage: false,
      firstTaskMessage: true
    });
  }

  render() {
    const { tasks, noTasks } = this.props;
    const { firstTimeMessage, firstTaskMessage } = this.state;
    const dailyTasks = this.getTasksForList("daily");
    const globalTasks = this.getTasksForList("global");

    return (
      <main className="main">
        <div className="content">
          <h1 className="heading">
            Daily Task List
            <button
              className="icon-add heading__btn-add-task open-dialog add-task-btn"
              onClick={() => this.props.showModal("addTask")}
            />
          </h1>
          {Object.keys(tasks).length > 0 ? (
            <div>
              {Object.keys(dailyTasks).length > 0 ? (
                <DailyTaskList tasks={dailyTasks} />
              ) : (
                <DragFirstTaskMessage />
              )}

              {Object.keys(globalTasks).length > 0 ? <GlobalTaskList tasks={globalTasks} /> : null}
            </div>
          ) : noTasks && firstTimeMessage ? (
            <FirstTimeMessage handleSkip={this.handleSkip} />
          ) : noTasks && firstTaskMessage ? (
            <FirstTaskMessage />
          ) : (
            <Preloader />
          )}
        </div>

        <div>
          {this.props.dialog.visible && this.props.dialog.name === "addTask" && (
            <Modal>
              <AddTaskDialog
                handleTextChange={this.handleTextChange}
                handleRadioChange={this.handleRadioChange}
                handleEstimationChange={this.handleEstimationChange}
              />
            </Modal>
          )}

          {this.props.dialog.visible && this.props.dialog.name === "editTask" && (
            <Modal>
              <EditTaskDialog
                handleTextChange={this.handleTextChange}
                handleRadioChange={this.handleRadioChange}
                handleEstimationChange={this.handleEstimationChange}
                handleEditTask={this.handleEditTask}
              />
            </Modal>
          )}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.items,
  dialog: state.modals.dialog,
  noTasks: state.tasks.noTasks
});

export default connect(
  mapStateToProps,
  { showModal }
)(TaskPage);
