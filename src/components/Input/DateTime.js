import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  //   container: {
  //     display: "flex",
  //     flexWrap: "wrap",
  //   },
  //   textField: {
  //     marginLeft: theme.spacing(1),
  //     marginRight: theme.spacing(1),
  //     width: 200,
  //   },
  input: {
    // margin: "10px 0px",
    "& .MuiIconButton-root": {
      color: "#005288",
      padding: 0,
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0099ff70",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#005288",
    },
    "& .MuiOutlinedInput-input": {
      color: "#0099ff70",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#005288",
    },
    "& .MuiInputLabel-outlined": {
      color: "#0099ff70",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#005288",
    },
  },
}));

function DateTime(props) {
  const { value, onChangeEvent, label, style, disabled } = props;

  const classes = useStyles();

  return (
    <TextField
      id="datetime-local"
      type="datetime-local"
      variant="outlined"
      disabled={disabled}
      style={style}
      label={label ? label : "Date & Time Picker"}
      defaultValue={value}
      onChange={(e) => onChangeEvent(e.target.value)}
      className={classes.input}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default DateTime;
