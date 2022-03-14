import React from "react";

//Components
//--> Button
import Button from "../Button/Button";
//--> Input
import TextInput from "../Input/TextInput";
import PhoneInput from "../Input/PhoneInput";
import SelectInput from "../Input/SelectInput";
import DateTime from "../Input/DateTime";

export default function Forms(props) {
  const { label, handleSubmit, TextBoxes, onSubmit } = props;

  const commontStyle = { margin: "20px 0px" };
  return (
    <div className="forms">
      <h2>{label}</h2>
      <form
        noValidate
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "row", flexFlow: "row wrap" }}
      >
        {TextBoxes.map((data) => {
          return data.type === "phone" ? (
            <PhoneInput
              key={data.label}
              value={data.value}
              onChangeEvent={data.onChange}
              size="medium"
            />
          ) : data.type === "select" ? (
            <SelectInput
              key={data.label}
              style={commontStyle}
              label={data.label}
              value={data.value}
              onChangeEvent={data.onChange}
              menuItems={data.menu}
            />
          ) : data.type === "dateTime" ? (
            <DateTime
              style={commontStyle}
              value={data.value}
              onChangeEvent={data.onChange}
              label={data.label}
              disabled={data.disabled}
            />
          ) : (
            <TextInput
              key={data.label}
              style={commontStyle}
              value={data.value}
              onChangeEvent={data.onChange}
              label={data.label}
              multiline={data.multiline}
            />
          );
        })}
        <div style={{ alignSelf: "center" }}>
          {TextBoxes.map((data) => {
            return data.multiline ? (
              <p style={{ color: "#555", fontSize: 14 }}>
                [{data.value.length}/500]
              </p>
            ) : null;
          })}
        </div>
        <div className="Button">
          <Button
            label="Submit"
            variant="contained"
            styleType="primary"
            width={150}
            onClickEvent={onSubmit}
          />
        </div>
      </form>
    </div>
  );
}
