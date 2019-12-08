import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import logo1 from "./logo1";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<logo1 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
