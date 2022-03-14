import React, { useState, useContext, useEffect } from "react";

//Style
import Avatar from "@material-ui/core/Avatar";

//Assets
import Profile from "../../assets/Profile.png";

//Context
import { AuthContext, AuthActionContext } from "../../context/AuthContext";

function Feeds(props) {
  const { data } = props;

  //Context
  const { user } = useContext(AuthContext);

  return (
    <div className="feedback">
      {user.type === "admin" ? (
        <FeedHeader data={data} />
      ) : (
        <FeedHeaderPersonal data={data} />
      )}
      <FeedBody data={data} />
    </div>
  );
}

export default Feeds;

const FeedHeaderPersonal = (props) => {
  const { data } = props;

  //Context
  const { user } = useContext(AuthContext);

  const TimeStamp = data.createdAt ? data.createdAt.toDate() : false;
  let date = TimeStamp ? TimeStamp.toDateString() : null;
  let time = TimeStamp ? TimeStamp.toTimeString().split(" ", 1) : null;

  return (
    <div style={{ display: "flex", alignItems: "center", width: 250 }}>
      <Avatar
        alt="Profile Picture"
        src={user.avatar ? user.avatar : Profile}
        style={{ width: 50, height: 50 }}
      />
      <div style={{ margin: "0px 10px" }}>
        <h2 className="userName">{user.name ? user.name : "User Name"} </h2>
        <h3 className="time">
          {date} - {time}
        </h3>
      </div>
    </div>
  );
};

const FeedHeader = (props) => {
  const { data } = props;

  //State
  const [user, setUser] = useState({});

  //Context
  const { usersDetails } = useContext(AuthActionContext);

  const TimeStamp = data.createdAt ? data.createdAt.toDate() : false;
  let date = TimeStamp ? TimeStamp.toDateString() : null;
  let time = TimeStamp ? TimeStamp.toTimeString().split(" ", 1) : null;

  useEffect(() => {
    usersDetails(data.uid, setUser);
  }, [data]);

  return (
    <div style={{ display: "flex", alignItems: "center", width: 250 }}>
      <Avatar
        alt="Profile Picture"
        src={user.avatar ? user.avatar : Profile}
        style={{ width: 50, height: 50 }}
      />
      <div style={{ margin: "0px 10px" }}>
        <h2 className="userName">{user.name ? user.name : "User Name"} </h2>
        <h3 className="time">
          {date} - {time}
        </h3>
      </div>
    </div>
  );
};

const FeedBody = (props) => {
  const { feed } = props.data;
  return (
    <div className="feedbody">
      <b>User Feedback: </b>
      <p>{feed}</p>
      {/* <BodyPara label="User Feedback" data={feed} /> */}
    </div>
  );
};

const BodyPara = (props) => {
  const { label, data } = props;
  return data ? (
    <p>
      <b>{label}: </b>
      {data}
    </p>
  ) : null;
};
