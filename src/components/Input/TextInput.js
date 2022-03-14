import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles(() => ({
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

  multiInput: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0099ff70",
      height: 140,
    },
  },
}));

export default function TextInput(props) {
  const classes = useStyles();

  //State
  const [visible, setVisible] = useState(true);

  //Props
  const {
    onChangeEvent,
    value,
    multiline,
    label,
    size,
    style,
    type,
    error,
    placeholder,
  } = props;

  return (
    <TextField
      placeholder={placeholder}
      error={error ? true : false}
      style={multiline ? { margin: "20px 0", height: 140 } : style}
      fullWidth={true}
      value={value}
      onChange={(e) => onChangeEvent(e.target.value)}
      className={[classes.input, multiline ? classes.multiInput : null]}
      label={label}
      multiline={multiline ? multiline : false}
      maxRows={multiline ? 5 : null}
      variant="outlined"
      size={size ? size : "medium"}
      type={
        type === "password"
          ? visible
            ? "password"
            : "text"
          : type
          ? type
          : "text"
      }
      inputProps={multiline ? { maxLength: 500 } : {}}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setVisible(!visible)}
                    onMouseDown={() => setVisible(!visible)}
                  >
                    {visible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  );
}
