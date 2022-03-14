import React from "react";

//Router
import { Link } from "react-router-dom";

// Styles
import Button from "@material-ui/core/Button";

function Btn(props) {
  const {
    variant,
    style,
    styleType,
    onClickEvent,
    label,
    path,
    width,
    disabled,
  } = props;

  const btnStyle =
    styleType === "primary"
      ? {
          background: "linear-gradient(80deg, #0099ff, #005288)",
          color: "#fff",
          margin: "10px 0px",
          width: width,
        }
      : styleType === "secondary"
      ? { color: "#002f4f", margin: "10px 0px", width: width }
      : styleType === "disabled"
      ? { color: "#ccc", background: "#eee", margin: "10px 0px", width: width }
      : styleType === "accept"
      ? {
          color: "#fff",
          background: "darkgreen",
          margin: "10px 0px",
          width: width,
        }
      : styleType === "decline"
      ? {
          color: "#fff",
          background: "darkred",
          margin: "10px 0px",
          width: width,
        }
      : style
      ? style
      : null;

  return (
    <Button
      fullWidth
      variant={variant}
      style={btnStyle}
      onClick={onClickEvent}
      disabled={disabled}
    >
      {path ? (
        <Link to={path} style={{ textDecoration: "none", color: "#002f4f" }}>
          {label}
        </Link>
      ) : (
        label
      )}
    </Button>
  );
}

export function LinkBtn(props) {
  const { path, classname, label, style } = props;
  return (
    <Link to={path} className={classname} style={style}>
      {label}
    </Link>
  );
}

export default Btn;
