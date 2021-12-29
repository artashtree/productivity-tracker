import React, { Component } from "react";
import "./SettingsCycle.scss";

class SettingsCycle extends Component {
  formatTime(time) {
    const hours = parseInt(time / 60);
    const minutes = parseInt(time % 60);

    return `${hours}h ${minutes}m`;
  }

  generateYourCycleContent() {
    const { longBreak, shortBreak, workIteration, workTime } = this.props.settings;

    const fullWorkTime = workTime * workIteration * 2;
    const fullShortBreak = shortBreak * (workIteration - 1) * 2;
    const fullTime = fullWorkTime + fullShortBreak + longBreak;
    const percent = fullTime / 100;
    const firstCycle = workTime * workIteration + shortBreak * (workIteration - 1) + longBreak;
    const content = [];

    for (let i = 0; i < workIteration * 2; i++) {
      let dataContent = {};
      if (i === 0) {
        dataContent = {
          "data-content": 0,
        };
      } else if (i === workIteration * 2 - 1) {
        dataContent = {
          "data-content": this.formatTime(fullTime),
        };
      } else if (i === workIteration) {
        dataContent = {
          "data-content": "First cycle: " + this.formatTime(firstCycle),
        };
      }

      content.push(
        <strong
          {...dataContent}
          className="your-cycle__work-time"
          key={`your-cycle__work-time--${i}`}
          style={{ width: workTime / percent + "%" }}
        />
      );
      if (i === workIteration - 1) {
        content.push(
          <span
            className="your-cycle__long-break"
            key={`your-cycle__long-break--${i}`}
            style={{ width: longBreak / percent + "%" }}
          />
        );
      } else if (i !== workIteration * 2 - 1) {
        content.push(
          <em
            className="your-cycle__short-break"
            key={`your-cycle__short-break--${i}`}
            style={{ width: shortBreak / percent + "%" }}
          />
        );
      }
    }

    const spanCount = fullTime / 30;
    const spanStep = 30 / percent;
    let step = 0;
    let time = 0;

    for (let i = 0; i < spanCount - 1; i++) {
      time += 30;
      let dataContent = {
        "data-content": this.formatTime(time),
      };
      content.push(
        <span
          className={`your-cycle__halfanhour your-cycle__halfanhour--${i}`}
          style={{ left: step + spanStep + "%" }}
          {...dataContent}
          key={`your-cycle__halfanhour your-cycle__halfanhour--${i}`}
        />
      );
      step += spanStep;
    }

    return content;
  }

  render() {
    const content = this.generateYourCycleContent();

    return (
      <section className="your-cycle">
        <h3 className="your-cycle__heading">Your cycle</h3>
        <div className="your-cycle__container">{content}</div>
      </section>
    );
  }
}

export default SettingsCycle;
