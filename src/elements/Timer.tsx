import * as React from "react";
import "./Loading.css";
import moment from "moment";

export enum Type {
  day,
  month,
  year
}

type TimerType = "day" | "year" | "month";

interface ITimerProps {
  type: "Day" | "Year" | "Month";
}

interface ITimerState {
  pctComplete: Number;
}

class Timer extends React.Component<ITimerProps, ITimerState> {
  public constructor(props: ITimerProps) {
    super(props);
    this.state = {
      pctComplete: this.calculatePercentComplete()
    };
    this.calculationTimer();
  }

  private calculationTimer = () => {
    setTimeout(() => {
      this.setState({
        pctComplete: this.calculatePercentComplete()
      });
      this.calculationTimer();
    }, 5000);
  };

  public calculatePercentComplete = (): Number => {
    const type: TimerType = this.props.type as TimerType;
    return (
      (1 -
        moment()
          .endOf(type)
          .diff(moment(), `${type}s` as (TimerType), true)) *
      100
    );
  };
  public render = () => (
    <div className="timer" title="timer">
      <div>
        <div className="type">{this.props.type}</div>
        <div>{`${this.state.pctComplete.toFixed(2)}%`}</div>
      </div>
    </div>
  );
}
export default Timer;
