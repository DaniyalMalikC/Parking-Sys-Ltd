import React from "react";

//Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";

export default function List(props) {
  const { listItem } = props;
  return (
    <ul className="list">
      {listItem.map((data, index) => {
        return (
          <li className="listItem" key={("List", index)}>
            <FontAwesomeIcon icon={faDotCircle} className="icon" />
            {data.listItem}
          </li>
        );
      })}
    </ul>
  );
}
