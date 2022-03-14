import React from "react";

//MUI Style
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1),
    minWidth: 120,
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
    "& .MuiFilledInput-underline:before": {
      borderColor: "#005288",
    },
    "& .MuiFilledInput-underline:after": {
      borderColor: "#00121e",
    },
    "& .MuiFilledInput-input": {
      color: "#005288",
    },
    "& .MuiFilledInput-root.Mui-focused .MuiFilledInput-input": {
      color: "#00121e",
    },
    "& .MuiInputLabel-filled": {
      color: "#005288",
    },
    "& .MuiInputLabel-filled.Mui-focused": {
      color: "#00121e",
    },
  },
}));

function SelectInput(props) {
  const classes = useStyles();

  const { label, value, onChangeEvent, menuItems, variant, style } = props;

  return (
    <FormControl
      variant={variant ? variant : "outlined"}
      className={classes.input}
      style={style}
      fullWidth
    >
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChangeEvent}>
        {Object.keys(menuItems).length !== 0
          ? menuItems.map((data) => {
              return (
                <MenuItem value={data.id} key={data.id}>
                  {data.name}
                </MenuItem>
              );
            })
          : null}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
