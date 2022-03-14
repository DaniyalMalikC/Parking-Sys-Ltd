import React from "react";

//Link
import { Link } from "react-router-dom";

export default function Err404() {
  return (
    // <div>
    <div className="Err404">
      <div className="ErrCaption">
        <h1>Oops..!</h1>
        <h3>Some thing went wrong!</h3>
        <p>Error 404 page not found!</p>
        <Link to="/" className="path">
          Go To Sign In
        </Link>
      </div>
    </div>
    // </div>
  );
}
