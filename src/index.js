import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Logo1 from "./Logo1";
import Navbar from "./Navabar";
import Pizzas from "./Pizzas";
import Flexcontainer from "./Flexcontainer";
import Table from "./Booktable";
import * as serviceWorker from "./serviceWorker";
//import things ergant for Hasura
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
const client = new ApolloClient({
  uri: "https://graphql-on-postgres-web.herokuapp.com/v1/graphql"
});

ReactDOM.render(<Navbar />, document.getElementById("navbar"));
ReactDOM.render(
  <ApolloProvider client={client}>
    <Logo1 />
  </ApolloProvider>,
  document.getElementById("image")
);
ReactDOM.render(<Pizzas />, document.getElementById("pizze"));

ReactDOM.render(<Flexcontainer />, document.getElementById("container"));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Logo1 />
  </ApolloProvider>,
  document.getElementById("image2")
);
ReactDOM.render(<Table />, document.getElementById("reserve"));
//ReactDOM.render(<App />, document.getElementById("questionary"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
