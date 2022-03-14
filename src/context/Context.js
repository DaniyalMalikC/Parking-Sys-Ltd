import React from "react";

import AuthContextProvider from "./AuthContext";
import TicketContextProvider from "./TicketContext";
import FeedContextProvider from "./FeedbackContext";

const ContextProvider = (props) => {
  return (
    <AuthContextProvider>
      <TicketContextProvider>
        <FeedContextProvider>{props.children}</FeedContextProvider>
      </TicketContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProvider;
