import React, { useState, useContext } from "react";

// Styles
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

//Component
//--> Input
import PhoneInput from "../../components/Input/PhoneInput";
import TextInput from "../../components/Input/TextInput";
//--> Alert
import { Warning } from "../../components/Alert/Alert";
//--> Counter Picker
// import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

//Context
import { AuthActionContext } from "../../context/AuthContext";

export default function UserInfo() {
  const { userInfo } = useContext(AuthActionContext);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [noPlate, setNoPlate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [warn, setWarn] = useState("");

  const handleInfo = () => {
    phoneNumber !== "" && address !== ""
      ? userInfo(phoneNumber, brand, model, noPlate, address, setWarn)
      : setWarn("Please fill all inputs!");
    setTimeout(() => {
      setWarn("");
    }, 10000);
  };

  return (
    <div className="AuthScreen">
      <div className="AuthContainer">
        {warn ? (
          <Warning msg={warn} style={{ width: 350, padding: 20, margin: 20 }} />
        ) : null}
        <div className="AuthBox">
          <h1 className="AuthHeading">Complete Profile Information</h1>
          <h1 className="AuthSubHeading">Provide your details!</h1>

          <div className="flexCenter">
            <TextInput
              label="Car Brand Name"
              multiline={true}
              size="small"
              value={brand}
              onChangeEvent={setBrand}
            />
            <FormHelperText style={{ alignSelf: "flex-start" }}>
              Please write your complete car brand name e.g "Honda Civic or
              Suzuki Mehran".
            </FormHelperText>
          </div>

          <div className="flexCenter">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextInput
                style={{ marginRight: 5 }}
                label="Model Year"
                placeholder='e.g "2020 or 2005"'
                size="small"
                value={model}
                onChangeEvent={setModel}
              />
              <TextInput
                style={{ marginLeft: 5 }}
                label="Number Plate"
                placeholder='e.g "ABC-123"'
                size="small"
                value={noPlate}
                onChangeEvent={setNoPlate}
              />
            </div>
          </div>
          <div className="flexCenter">
            <PhoneInput value={phoneNumber} onChangeEvent={setPhoneNumber} />
          </div>

          <div className="flexCenter">
            <TextInput
              label="Complete Address"
              multiline={true}
              size="small"
              value={address}
              onChangeEvent={setAddress}
            />
            <FormHelperText style={{ alignSelf: "flex-start" }}>
              Please write your complete address.
            </FormHelperText>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                style={{
                  background: "linear-gradient(80deg, #0099ff, #005288)",
                  color: "#fff",
                  margin: "10px 0px",
                }}
                onClick={handleInfo}
              >
                Proceed to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
