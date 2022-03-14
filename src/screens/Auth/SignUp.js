import React, { useState, useContext } from "react";

// Styles
import FormHelperText from "@material-ui/core/FormHelperText";

//Component
//--> Alert
import { Error } from "../../components/Alert/Alert";
//--> Button
import Button from "../../components/Button/Button";
//--> Input
import TextInput from "../../components/Input/TextInput";

//Context
import { AuthActionContext } from "../../context/AuthContext";

export default function SignUp() {
  const { signUp } = useContext(AuthActionContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setEmail(text);
      setValid(false);
    } else {
      setEmail(text);
      setValid(true);
    }
  };

  const handleSignUp = () => {
    valid
      ? password === confirm && password !== "" && password.length >= 6
        ? signUp(name, email, password, Err)
        : resetPass()
      : setErr("Invalid Email Address!");
    setTimeout(() => {
      setErr("");
    }, 10000);
  };

  const Err = (x, y) => {
    setErr(x);
    setPassword("");
    setConfirm("");
    if (y === "auth/email-already-in-use") {
      setEmail("");
    }
    setTimeout(() => {
      setErr("");
    }, 10000);
  };

  const resetPass = () => {
    setPassword("");
    setConfirm("");
    setErr("Password doesn't match or too short!");
  };
  return (
    <div className="AuthScreen">
      <div className="AuthContainer">
        {err ? (
          <Error msg={err} style={{ width: 350, padding: 20, margin: 20 }} />
        ) : null}
        <div className="AuthBox">
          <h1 className="AuthHeading">Create your Account</h1>
          <h1 className="AuthSubHeading">Sign Up</h1>
          <div className="flexCenter">
            <TextInput
              label="Username"
              size="small"
              value={name}
              onChangeEvent={setName}
            />
          </div>
          <div className="flexCenter">
            <TextInput
              error={!valid}
              label="Email"
              size="small"
              value={email}
              onChangeEvent={validateEmail}
              type="email"
            />
            <FormHelperText style={{ alignSelf: "flex-start" }}>
              You can use letter, numbers & periods
            </FormHelperText>
          </div>
          <div className="flexCenter">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextInput
                style={{ marginRight: 5 }}
                label="Password"
                size="small"
                value={password}
                onChangeEvent={setPassword}
                type="password"
              />
              <TextInput
                style={{ marginLeft: 5 }}
                label="Confirm"
                size="small"
                value={confirm}
                onChangeEvent={setConfirm}
                type="password"
              />
            </div>
            <FormHelperText style={{ alignSelf: "flex-start" }}>
              You can use letter, numbers & periods. Password must be 6
              character long or more!
            </FormHelperText>
          </div>
          <div>
            <p
              style={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: 14,
              }}
            >
              by Signing Up you are agreeing all{" "}
              <b style={{ color: "#0099ff" }}>Terms and Conditions</b>.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                label="Sign In Instead"
                path="/"
                variant="text"
                style={{
                  margin: "10px",
                }}
              />
              <Button
                label="Sign Up"
                variant="contained"
                styleType="primary"
                onClickEvent={handleSignUp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
