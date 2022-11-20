import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import TaskPage from "./TaskPage";
import SettingsPage from "./SettingsPage";
import ReportPage from "./ReportPage";
import TimerPage from "./TimerPage";
import { fetchTasks } from "../actions/taskActions";
import { fetchSettings } from "../actions/settingsActions";
import "../config/db";

class ProductivityApp extends Component {
  componentDidMount() {
    this.props.fetchTasks();
    this.props.fetchSettings();
    console.log('Test deploy')
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
export default connect(null, { fetchTasks, fetchSettings })(ProductivityApp);
