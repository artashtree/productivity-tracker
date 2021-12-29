import React, { Component } from "react";
import SettingsItem from "./SettingsItem";
import "./SettingsList.scss";

const settingsArr = [
  {
    name: "work-time",
    pname: "workTime",
    title: "Work Time",
    step: 5,
    min: 15,
    max: 35,
  },
  {
    name: "work-iteration",
    pname: "workIteration",
    title: "Work Iteration",
    step: 1,
    min: 2,
    max: 5,
  },
  {
    name: "short-break",
    pname: "shortBreak",
    title: "Short Break",
    step: 1,
    min: 3,
    max: 5,
  },
  {
    name: "long-break",
    pname: "longBreak",
    title: "Long Break",
    step: 5,
    min: 15,
    max: 40,
  },
];

class SettingsList extends Component {
  render() {
    const { settings } = this.props;

    return (
      <ul className="pomodoros-list">
        {settingsArr.map((item) => (
          <SettingsItem
            config={item}
            value={settings[item.pname]}
            handleChange={this.props.handleChange}
            key={item.name}
          />
        ))}
      </ul>
    );
  }
}

export default SettingsList;
