import React from "react";

//Importing Material UI Alert
import { Alert, AlertTitle } from "@material-ui/lab";

const Error = (props) => {
  const { title, msg, style } = props;
  return (
    <Alert severity="error" style={style}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {msg}
    </Alert>
  );
};

const Warning = (props) => {
  const { title, msg, style } = props;
  return (
    <Alert severity="warning" style={style}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {msg}
    </Alert>
  );
};

const Info = (props) => {
  const { title, msg, style } = props;
  return (
    <Alert severity="info" style={style}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {msg}
    </Alert>
  );
};

const Success = (props) => {
  const { title, msg, style } = props;
  return (
    <Alert severity="success" style={style}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {msg}
    </Alert>
  );
};

export { Error, Warning, Info, Success };
