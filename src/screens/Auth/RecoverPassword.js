import React, { useState, useContext } from "react";

//Component
//--> Alert
import { Error, Success } from "../../components/Alert/Alert";
//--> Button
import Button from "../../components/Button/Button";
//--> Input
import TextInput from "../../components/Input/TextInput";

//Context
import { AuthActionContext } from "../../context/AuthContext";

export default function RecoverPassword() {
  const { recoverPass } = useContext(AuthActionContext);

  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPass = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setErr("Invalid Email Address!");
      setTimeout(() => {
        setErr("");
      }, 10000);
    } else {
      recoverPass(email, setErr, setSuccess);
    }
  };

  return (
    <div className="AuthScreen">
      <div className="AuthContainer">
        {err ? (
          <Error msg={err} style={{ width: 350, padding: 20, margin: 20 }} />
        ) : success ? (
          <Success
            msg={success}
            style={{ width: 350, padding: 20, margin: 20 }}
          />
        ) : null}
        <div className="AuthBox">
          <h1 className="AuthHeading">Recover</h1>
          <h1 className="AuthSubHeading">your Password!</h1>

          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 300,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            After pressing the button please{" "}
            <b style={{ color: "#0099ff" }}>check your Email!</b> If you can't
            find our email then check your{" "}
            <b style={{ color: "#0099ff" }}>SPAM Mailbox</b>.
          </p>
          <div className="flexCenter">
            <TextInput
              label="Registered Email"
              value={email}
              onChangeEvent={setEmail}
              type="email"
            />
          </div>

          <div>
            <p
              style={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Please make sure of your email is correct or not before
              submitting.
            </p>
            <Button
              label="Send Password Recovery Link!"
              variant="contained"
              styleType="primary"
              onClickEvent={handleResetPass}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: 10,
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              If you remember your password then
              <Button
                label="Sign In"
                variant="text"
                style={{
                  fontSize: 12,
                  padding: 0,
                  width: 140,
                }}
                path="/"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
