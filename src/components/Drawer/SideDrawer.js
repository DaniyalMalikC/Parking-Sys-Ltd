import React, { useState, useContext } from "react";

import { useHistory, useLocation } from "react-router-dom";

//Style
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Hidden,
  AppBar,
  IconButton,
} from "@material-ui/core";
import {
  // Business,
  Home,
  RecordVoiceOver,
  PlaylistAdd,
  ConfirmationNumber,
  SpeakerNotes,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@material-ui/icons";

//Component
//--> Button
import Button from "../Button/Button";

//Context
import { AuthActionContext } from "../../context/AuthContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#eff8ff",
    border: 0,
    boxShadow: "2px 2px 10px #00528850",
    overflow: "hidden",
  },
  active: {
    background: "linear-gradient(45deg, #0099ff, #005288)",
    color: "#fff",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#00121e",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
}));

export default function SideDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  //Context
  const { signOut } = useContext(AuthActionContext);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const menuItem = [
    {
      text: "Dashboard",
      icon: <Home />,
      path: "/Dashboard",
    },
    {
      text: "Ticket",
      icon: <ConfirmationNumber />,
      path: "/Dashboard/Ticket",
    },
    {
      text: "Feedback",
      icon: <SpeakerNotes />,
      path: "/Dashboard/Feedback",
    },
  ];

  const drawer = (
    <div>
      <List>
        {menuItem.map((item) => {
          return (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              style={{ margin: 20, borderRadius: 5 }}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ fontWeight: 700, fontFamily: "Poppins", flex: 1 }}
            variant="h5"
            noWrap
          >
            <p style={{ fontSize: 16, fontWeight: "300" }}>
              Track your Parking with
            </p>
            Parking Sys LTD
          </Typography>
          <Button
            label="Logout"
            variant="contained"
            style={{
              background: "#9f121a",
              color: "#fff",
              width: 120,
            }}
            onClickEvent={handleLogout}
          />
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.closeMenuButton}
          >
            <CloseIcon />
          </IconButton>
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
}
