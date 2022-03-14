import React from "react";

export default function MultiCard(props) {
  const { data } = props;
  return (
    <div className="multi-card">
      <div className="icon">
        <img src={data.icon} alt={data.title} title={data.title} />
      </div>
      <div className="details">
        <h3>{data.title}</h3>
        <p>{data.para}</p>
      </div>
    </div>
  );
}
