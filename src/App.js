import React from "react";
import "./App.css";

import Router from "./route/Router";

//Context
import ContextProvider from "./context/Context";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Router />
      </ContextProvider>
    </div>
  );
}

export default App;
