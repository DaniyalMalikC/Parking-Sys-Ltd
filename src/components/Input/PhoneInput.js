import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import MuiPhoneNumber from "material-ui-phone-number";

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
}));

function PhoneInput(props) {
  const classes = useStyles();

  const { onChangeEvent, value, size } = props;

  return (
    <MuiPhoneNumber
      className={classes.input}
      variant="outlined"
      size={size ? size : "small"}
      fullWidth={true}
      label="Phone Number"
      defaultCountry={"pk"}
      value={value}
      onChange={onChangeEvent}
      autoFormat={false}
    />
  );
}

export default PhoneInput;
