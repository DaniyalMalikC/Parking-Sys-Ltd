import React, { useState, useContext, useEffect } from "react";

//Style
import { makeStyles } from "@material-ui/core/styles";

//Component
//--> Drawer
import SideDrawer from "../../components/Drawer/SideDrawer";
//--> Cover
import { Info, Error, Success } from "../../components/Alert/Alert";
//--> Forms
import Forms from "../../components/Forms/Forms";
//--> Tags
import Tags from "../../components/Forms/Tags";

//Context
import {
  TicketContext,
  TicketActionContext,
} from "../../context/TicketContext";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    flex: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

function Ticket() {
  const classes = useStyles();

  //Context
  const { tickets } = useContext(TicketContext);
  const { user } = useContext(AuthContext);
  const { handleTicketSubmit } = useContext(TicketActionContext);

  //States
  //--> Forms
  const [noOfHours, setNoOfHours] = useState(1);

  const dateTimeFormat = (data) => {
    return data < 10 ? "0" + data : data;
  };

  let date = new Date();
  let startDateTime = `${date.getFullYear()}-${dateTimeFormat(
    date.getMonth() + 1,
  )}-${dateTimeFormat(date.getDate())}T${dateTimeFormat(
    date.getHours(),
  )}:${dateTimeFormat(date.getMinutes())}`;

  let endDateTime = `${date.getFullYear()}-${dateTimeFormat(
    date.getMonth() + 1,
  )}-${dateTimeFormat(date.getDate())}T${dateTimeFormat(
    date.getHours() + noOfHours,
  )}:${dateTimeFormat(date.getMinutes())}`;

  //States
  //--> Forms
  const [startTime, setStartTime] = useState(startDateTime);
  const [endTime, setEndTime] = useState(endDateTime);
  const [price, setPrice] = useState(noOfHours * 10);
  const [area, setArea] = useState(1);
  const [tips, setTips] = useState("");
  //--> Alert
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const handleTime = (text) => {
    setStartTime(text);
  };

  let newDate;
  useEffect(() => {
    newDate = new Date(startTime);

    let hr = newDate.getHours() + (noOfHours ? parseInt(noOfHours) : 1);

    endDateTime = `${newDate.getFullYear()}-${dateTimeFormat(
      newDate.getMonth() + 1,
    )}-${dateTimeFormat(newDate.getDate())}T${dateTimeFormat(
      hr,
    )}:${dateTimeFormat(newDate.getMinutes())}`;

    setEndTime(endDateTime);
    setPrice(noOfHours * 10);
  }, [handleTime, noOfHours]);

  const handleSelectItem = (e) => {
    setArea(e.target.value);
  };

  const parkMenu = [
    { name: "P1", id: 1 },
    { name: "P2", id: 2 },
    { name: "P3", id: 3 },
    { name: "P4", id: 4 },
    { name: "P5", id: 5 },
  ];

  const TextBoxes = [
    {
      label: "Parking Start Time",
      onChange: handleTime,
      value: startTime,
      type: "dateTime",
    },

    {
      label: "Parking Hours",
      onChange: setNoOfHours,
      value: noOfHours,
    },

    {
      label: "Parking Area",
      onChange: handleSelectItem,
      value: area,
      type: "select",
      menu: parkMenu,
    },
    {
      label: "Any Tips (Optional)",
      onChange: setTips,
      value: tips,
    },
  ];

  //--> Regester Agent Work Start
  const handleSubmit = () => {
    if (noOfHours <= 4 && noOfHours !== 0) {
      if (startTime) {
        handleTicketSubmit(
          startTime,
          endTime,
          price,
          tips,
          area,
          setAlertTitle,
          setErr,
          setSuccess,
        );
        setTimeout(() => {
          setStartTime("");
          setStartTime(startDateTime);
          setEndTime(endDateTime);
          setArea(1);
          setPrice(0);
          setNoOfHours(1);
          setTips("");
        }, 1000);
      } else {
        setErr("Please fill in all input box with required information!");
        setTimeout(() => {
          setErr("");
        }, 10000);
      }
    } else {
      setErr(
        "You cannot Park your car for more than 4 hours or up-to Zero Hours!",
      );
      setTimeout(() => {
        setErr("");
      }, 10000);
    }
  };

  //--> Handle Alert Start
  const Alert = err ? Error : success ? Success : null;
  const alert = err ? err : success ? success : null;
  //--> Handle Alert End

  const currentTicket = {
    Brand: user.brand,
    Model: user.model,
    No: user.noPlate,
    Start: startTime,
    End: endTime,
    price: price,
    approve: false,
    area: area,
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#F3F4F7" }}>
      <SideDrawer />
      <div style={{ flex: 1 }}>
        <div className={classes.toolbar} />
        {/* <Cover title="Agents Ticket" /> */}
        {alert !== null ? (
          <Alert
            title={alertTitle}
            msg={alert}
            style={{ margin: "0px 30px" }}
          />
        ) : null}
        <div className={classes.content}>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Forms
              label="Register your Ticket:"
              TextBoxes={TextBoxes}
              onSubmit={handleSubmit}
            />
            <Tags data={currentTicket} type="display" />
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {tickets.length !== 0 ? (
              tickets.map((data) => {
                return <Tags data={data} />;
              })
            ) : (
              <Info
                style={{ flex: 1 }}
                title="Generate Ticket"
                msg="There is no Ticket generated by your team."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
