import React, { useContext } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Screens
import Login from "../screens/Auth/SignIn";
import RecoverPassword from "../screens/Auth/RecoverPassword";
import SignUp from "../screens/Auth/SignUp";
import UserInfo from "../screens/Auth/UserInfo";
import Dashboard from "../screens/Dashboard";
import Feedback from "../screens/Dashboard/Feedback";
import Ticket from "../screens/Dashboard/Ticket";
import Err404 from "../screens/Err404";

//Context
import { AuthContext } from "../context/AuthContext";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <AuthRoute exact path="/" component={Home} /> */}
        <AuthRoute exact path="/" component={Login} />
        <AuthRoute exact path="/SignUp" component={SignUp} />
        <AuthRoute
          exact
          path="/Password-Recovery"
          component={RecoverPassword}
        />
        <PrivateRoute
          exact
          path="/user-detailed-information"
          component={UserInfo}
        />
        <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
        <ProtectedRoute path="/Dashboard/Feedback" component={Feedback} />
        <ProtectedRoute path="/Dashboard/Ticket" component={Ticket} />
        <Route component={Err404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuth, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && user["phoneNumber"] !== "" ? (
          <Component {...props} />
        ) : isAuth && user["phoneNumber"] === "" ? (
          <Redirect
            to={{
              pathname: "/user-detailed-information",
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/SignUp",
            }}
          />
        )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && user["phoneNumber"] === "" ? (
          <Component {...props} />
        ) : isAuth && user["phoneNumber"] !== "" ? (
          <Redirect
            to={{
              pathname: "/Dashboard",
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/SignUp",
            }}
          />
        )
      }
    />
  );
};

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/Dashboard",
            }}
          />
        )
      }
    />
  );
};
