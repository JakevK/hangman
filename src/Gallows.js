import React from "react";
import "./gallows.css";

class Gallows extends React.Component {
  render() {
    const stand = (
      <div>
        <div className="gallow-component stand-p1"></div>
        <div className="gallow-component stand-p2"></div>
        <div className="gallow-component stand-p3"></div>
        <div className="gallow-component stand-p4"></div>
      </div>
    );
    const person = [
      <div className="hung-component head"></div>,
      <div className="hung-component body"></div>,
      <div className="hung-component arm-1"></div>,
      <div className="hung-component arm-2"></div>,
      <div className="hung-component leg-1"></div>,
      <div className="hung-component leg-2"></div>,
    ].slice(0, this.props.progress);
    return <div className="gallows">{stand}{person}</div>;
  }
}

export default Gallows;
