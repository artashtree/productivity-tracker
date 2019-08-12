import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./header";
import TaskPage from "./task-page";
import SettingsPage from "./settings-page";
import ReportPage from "./report-page";
import TimerPage from "./timer-page";
import { fetchTasks } from "../../actions/taskActions";
import { fetchSettings } from "../../actions/settingsActions";

import "../../config/db";

class ProductivityApp extends Component {
  componentDidMount() {
    this.props.fetchTasks();
    this.props.fetchSettings();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={TaskPage} />
          <Route path="/report" component={ReportPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/timer" component={TimerPage} />
        </div>
      </Router>
    );
  }
}
export default connect(
  null,
  { fetchTasks, fetchSettings }
)(ProductivityApp);
