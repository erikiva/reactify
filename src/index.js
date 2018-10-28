import React from "react";
import ReactDOM from "react-dom";

import Widget from "./Widget";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Widget />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
