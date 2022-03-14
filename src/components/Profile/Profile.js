import React, { useContext } from "react";

//Assets
import Avatar from "../../assets/Profile.png";

//Context
import { AuthContext } from "../../context/AuthContext";

//Style
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
  },
}));

function Profile() {
  const classes = useStyles();

  //Context
  const { user } = useContext(AuthContext);

  return (
    <div className="forms" style={{ alignItems: "center" }}>
      <img
        alt={user["name"]}
        src={user["avatar"] !== "" ? user["avatar"] : Avatar}
        className="avatar"
      />
      <h1 className="name">{user["name"]}</h1>
      <h2 className="email">{user["email"]}</h2>

      <Grid container spacing={2} className="userInfo">
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h4>Phone #</h4>
            <p>{user["phoneNumber"]}</p>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h4>Type:</h4>
            <p>{user["type"]}</p>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h4>Car Brand:</h4>
            <p>{user["brand"]}</p>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h4>Modal & Number:</h4>
            <p>{user["model"] + " - " + user["noPlate"]}</p>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h4>Address:</h4>
            <p>{user["address"]}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
