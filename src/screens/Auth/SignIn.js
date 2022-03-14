import React, { useState, useContext } from "react";

// Styles
// import Button from "@material-ui/core/Button";

//Component
//--> Alert
import { Error, Warning } from "../../components/Alert/Alert";
//--> Button
import Button, { LinkBtn } from "../../components/Button/Button";
//--> Input
import TextInput from "../../components/Input/TextInput";

//Context
import { AuthActionContext } from "../../context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warn, setWarn] = useState("");
  const [err, setErr] = useState("");

  const { signIn } = useContext(AuthActionContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    email === "" || password === ""
      ? setErr("Please! Fill in text boxes before submitting. Thanks")
      : signIn(email, password, setWarn, setErr);
    setTimeout(() => {
      setWarn("");
      setErr("");
    }, 10000);
  };

  return (
    <div className="AuthScreen">
      <div className="AuthContainer">
        {warn ? (
          <Warning
            title="Unverified Email!"
            msg={warn}
            style={{ width: 350, padding: 20, margin: 20 }}
          />
        ) : err ? (
          <Error
            title="Authentication Error!"
            msg={err}
            style={{ width: 350, padding: 20, margin: 20 }}
          />
        ) : null}
        <div className="AuthBox">
          <h1 className="AuthHeading">Welcome Back!</h1>
          <h1 className="AuthSubHeading">Sign In</h1>

          <div className="flexCenter">
            <TextInput
              label="Email"
              value={email}
              onChangeEvent={setEmail}
              type="email"
            />
          </div>
          <div className="flexCenter">
            <TextInput
              label="Password"
              value={password}
              onChangeEvent={setPassword}
              type="password"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 10,
              // background: "#ccc",
            }}
          >
            <Button
              variant="text"
              label="Forgot Password?"
              path="/Password-Recovery"
              style={{
                color: "#002f4f",
                fontSize: 12,
                padding: 0,
                width: 140,
              }}
            />
          </div>
          <div>
            <p
              style={{
                textAlign: "center",
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: 14,
              }}
            >
              by Signing In you are agreeing all{" "}
              <b style={{ color: "#0099ff" }}>Terms and Conditions</b>.
            </p>

            <Button
              label="Sign In"
              variant="contained"
              styleType="primary"
              onClickEvent={(e) => handleSignIn(e)}
            />

            <p
              style={{
                textAlign: "center",
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: 14,
                margin: 10,
              }}
            >
              don't have an account{" "}
              <LinkBtn
                label="Sign Up"
                path="/SignUp"
                style={{
                  color: "#0099ff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
