import React, { useState, useContext, useEffect } from "react";

//Style
import Avatar from "@material-ui/core/Avatar";

//Assets
import Profile from "../../assets/Profile.png";

//Components
//--> Button
import Button from "../Button/Button";

//Context
import { AuthContext, AuthActionContext } from "../../context/AuthContext";
import { TicketActionContext } from "../../context/TicketContext";

import emailjs from "@emailjs/browser";

function Tags(props) {
  const { data, type, ref } = props;

  //State
  const [user, setUser] = useState({});

  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  //Context
  const { usersDetails } = useContext(AuthActionContext);

  useEffect(() => {
    usersDetails(data.uid, setUser);
  }, [data]);

  return (
    <div className="feedback" ref={type === "display" ? ref : null}>
      {type === "display" ? (
        <>
          <TagHeaderPersonal data={data} />
          <TagBodyPersonal data={data} />
        </>
      ) : (
        <>
          <TagHeader data={{ ...data, ...user }} />
          <TagBody data={{ ...data, ...user, setStart, setEnd }} />
        </>
      )}
      <TagFooter
        data={user ? { ...data, ...user, start, end } : data}
        type={type}
      />
    </div>
  );
}

export default Tags;

const TagHeaderPersonal = (props) => {
  //Context
  const { user } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", alignItems: "center", width: 250 }}>
      <Avatar
        alt="Profile Picture"
        src={user.avatar ? user.avatar : Profile}
        style={{ width: 50, height: 50 }}
      />
      <div style={{ margin: "0px 10px" }}>
        <h2 className="userName" name="Name">
          {user.name ? user.name : "User Name"}{" "}
        </h2>
        <h3 className="time" name="user_email">
          {user.email}
        </h3>
      </div>
    </div>
  );
};

const TagHeader = (props) => {
  const { data } = props;

  const TimeStamp = data.createdAt ? data.createdAt.toDate() : false;
  let date = TimeStamp ? TimeStamp.toDateString() : null;
  let time = TimeStamp ? TimeStamp.toTimeString().split(" ", 1) : null;

  return (
    <div style={{ display: "flex", alignItems: "center", width: 250 }}>
      <Avatar
        alt="Profile Picture"
        src={data.avatar ? data.avatar : Profile}
        style={{ width: 50, height: 50 }}
      />
      <div style={{ margin: "0px 10px" }}>
        <h2 className="userName">{data.name ? data.name : "User Name"} </h2>
        <h3 className="time">
          {date} - {time}
        </h3>
      </div>
    </div>
  );
};

const TagBodyPersonal = (props) => {
  const { area, Brand, Model, No, Start, End } = props.data;

  const start = Start ? Start.replace("T", " - ") : null;
  const end = End ? End.replace("T", " - ") : null;

  return (
    <div className="feedbody">
      <BodyPara label="Parking Area" data={"P" + area} name="parking" />
      <BodyPara label="Brand" data={Brand} />
      <BodyPara label="Model" data={Model} />
      <BodyPara label="No Plate" data={No} />
      <BodyPara label="Start Date & Time" data={start} name="startTime" />
      <BodyPara label="End Date & Time" data={end} name="endTime" />
    </div>
  );
};

const TagBody = (props) => {
  const { brand, model, noPlate, startTime, endTime, area, setStart, setEnd } =
    props.data;

  const dateTimeFormat = (data) => {
    return data < 10 ? "0" + data : data;
  };

  const dateTime = (dateTime) => {
    let date = new Date(dateTime.toDate());
    return `${date.getFullYear()}-${dateTimeFormat(
      date.getMonth() + 1,
    )}-${dateTimeFormat(date.getDate())} - ${dateTimeFormat(
      date.getHours(),
    )}:${dateTimeFormat(date.getMinutes())}`;
  };

  const start = startTime ? dateTime(startTime) : null;
  const end = endTime ? dateTime(endTime) : null;

  useEffect(() => {
    setStart(start);
    setEnd(end);
  }, [start, end]);
  // const start = startTime ? startTime.replace("T", " - ") : null;
  // const end = endTime ? endTime.replace("T", " - ") : null;

  return (
    <div className="feedbody">
      <BodyPara label="Parking Area" data={area} name="parking" />
      <BodyPara label="Brand" data={brand} />
      <BodyPara label="Model" data={model} />
      <BodyPara label="No Plate" data={noPlate} />
      <BodyPara label="Start Date & Time" data={start} name="startTime" />
      <BodyPara label="End Date & Time" data={end} name="endTime" />
    </div>
  );
};
const BodyPara = (props) => {
  const { label, data, name } = props;
  return (
    <p style={{ borderBottom: "1px solid #ccc", marginBottom: 5 }}>
      <b>{label}: </b>
      <p name={name ? name : null}>{data ? data : null}</p>
    </p>
  );
};

const TagFooter = (props) => {
  const { type, data } = props;
  const { price, approve, ticketID } = props.data;

  //Context
  const { user } = useContext(AuthContext);
  const { updateTicketStatus, deleteTicketStatus } =
    useContext(TicketActionContext);

  const commontStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const status = approve
    ? { padding: 5, color: "#fff", background: "green" }
    : {
        padding: 5,
        color: "#fff",
        background: "red",
      };

  const handleApprove = () => {
    console.log(data);
    emailjs
      .send(
        "service_rzwnlpq",
        "template_u8w7ljy",
        {
          name: data.name,
          user_email: data.email,
          startTime: data.start,
          area: data.area,
          endTime: data.end,
          brand: data.brand,
          noPlate: data.noPlate,
        },
        "user_aV26QX2PM16kK0e6JMN6v",
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    updateTicketStatus(ticketID, data);
  };

  return (
    <div>
      <div style={commontStyle}>
        <h4>Approval: </h4>
        <h4 style={status} name="status">
          {approve ? "Approve" : "Not approve yet"}
        </h4>
      </div>
      <div style={commontStyle}>
        <h2>Total Price:</h2>
        {price ? <h2 name="price">$ {price}</h2> : <h2>$ 0</h2>}
      </div>

      {user.type === "admin" && type !== "display" && !approve ? (
        <div style={commontStyle}>
          <Button
            label="Decline"
            variant="contained"
            styleType="decline"
            width={140}
            onClickEvent={() => deleteTicketStatus(ticketID)}
          />
          <Button
            label="Accept"
            variant="contained"
            styleType="accept"
            width={140}
            onClickEvent={() => handleApprove()}
          />
        </div>
      ) : user.type === "admin" && type !== "display" && approve ? (
        <div style={commontStyle}>
          <Button
            label="Delete Ticket"
            variant="contained"
            styleType="decline"
            width={300}
            onClickEvent={() => deleteTicketStatus(ticketID)}
          />
        </div>
      ) : null}
    </div>
  );
};
