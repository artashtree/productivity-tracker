import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Highcharts from "highcharts";
import config from "../config/hchConfig";

class ReportPage extends Component {
  componentDidMount() {
    const series = [];

    let urgentTasks = this.getTasksQuantity("urgent");
    let highTasks = this.getTasksQuantity("high");
    let middleTasks = this.getTasksQuantity("middle");
    let lowTasks = this.getTasksQuantity("low");

    if (urgentTasks) {
      series.push({ name: "Urgent", data: [urgentTasks] });
    }

    if (highTasks) {
      series.push({ name: "High", data: [highTasks] });
    }

    if (middleTasks) {
      series.push({ name: "Middle", data: [middleTasks] });
    }

    if (lowTasks) {
      series.push({ name: "Low", data: [lowTasks] });
    }

    if (!series.length) {
      this.props.history.push("/");
    }

    config.series = series;
    Highcharts.chart(config);
  }

  getTasksQuantity(priority) {
    const { tasks } = this.props;
    const filteredTasks = [];

    for (let key in tasks) {
      if (tasks[key].isDone) {
        if (tasks[key]["priority"] === priority) {
          filteredTasks.push(tasks[key]);
        }
      }
    }

    return filteredTasks.length;
  }

  render() {
    return (
      <main className="main">
        <div className="content">
          <h1 className="heading">Report</h1>
          <div id="charts-container" />
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.items,
  };
};

export default connect(mapStateToProps, null)(withRouter(ReportPage));
