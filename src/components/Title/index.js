import React from "react";

export default function Title(props) {
  return (
    <div className="MainHeading">
      <div className="title">
        <div className="text">
          <h4 style={{ zIndex: 1 }}>Know more about</h4>
          {props.overlay ? (
            <span className="overlay">{props.overlay}</span>
          ) : (
            props.overlay
          )}
        </div>
        <div className="text">
          {props.title ? <h1>{props.title}</h1> : null}
        </div>
        <div className="hr">
          <hr />
        </div>
        {props.para ? (
          <p style={{ whiteSpace: "pre-line" }}>{props.para}</p>
        ) : null}
      </div>
    </div>
  );
}
