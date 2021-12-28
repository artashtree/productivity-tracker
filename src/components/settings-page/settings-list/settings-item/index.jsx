import React, { Component } from "react";

class SettingsItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleChange(e.target.dataset.action, this.props.config);
  }

  render() {
    const { name, title, min, max } = this.props.config;
    const { value } = this.props;

    return (
      <li className={`pomodoros-list__item pomodoros-list__item--${name}`}>
        <strong className="pomodoros-list__title">{title}</strong>

        <div className="pomodoros-list__controls">
          <button
            className="icon-minus pomodoros-list__btn"
            onClick={this.handleClick}
            data-action="minus"
          />
          <span className="pomodoros-list__value">{value}</span>
          <button
            className="icon-add pomodoros-list__btn"
            onClick={this.handleClick}
            data-action="plus"
          />
        </div>

        <p className="pomodoros-list__text">
          <span>{`Please select a value between ${min} and ${max}`} </span>
          <em className="pomodoros-list__highlight">minutes</em>
        </p>
      </li>
    );
  }
}

export default SettingsItem;
