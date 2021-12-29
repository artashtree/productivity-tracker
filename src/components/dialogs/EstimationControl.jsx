import React, { Component } from "react";
import { estimationControlScale } from '../../config/dialogsConfig';
import "./EstimationControl.scss";

class EstimationControl extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleEstimationChange(e);
  }

  render() {
    return (
      <div>
        {estimationControlScale.map((item) => {
          const id = `estimation-${item}`;
          const checked = { checked: false };
          if (item === +this.props.estimation) checked.checked = true;
          let active = "";
          if (item <= +this.props.estimation) active = "dialog__pomodoro-label--active";

          return (
            <label htmlFor={id} className={`dialog__pomodoro-label ${active}`} key={id}>
              <input
                className="dialog__pomodoro-input"
                type="radio"
                name="estimation"
                id={id}
                value={item}
                {...checked}
                onChange={this.handleChange}
              />
            </label>
          );
        })}
      </div>
    );
  }
}

export default EstimationControl;
