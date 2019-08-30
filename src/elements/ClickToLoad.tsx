import * as React from "react";
import "./ClickToLoad.css";

interface ICtlProps {
  onClick: (e: any) => void;
}

const ClickToLoad = (props: ICtlProps) => (
  <div className="click-to-load" title="Click To Load" onClick={props.onClick}>
    Click to load
  </div>
);
export default ClickToLoad;
