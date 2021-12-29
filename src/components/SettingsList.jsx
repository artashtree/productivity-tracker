import React, { Component } from "react";
import SettingsItem from "./SettingsItem";
import SettingsListArr from '../config/settingsList';
import "./SettingsList.scss";

class SettingsList extends Component {
  render() {
    const { settings } = this.props;

    return (
      <ul className="pomodoros-list">
        {SettingsListArr.map((item) => (
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
