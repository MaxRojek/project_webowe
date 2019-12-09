import React from "react";
import "./Logo1.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const PIZZAS = gql`
  query pizzas {
    meals(limit: 2) {
      id
      name
    }
  }
`;

export default function Logo1() {
  const { loading, error, data } = useQuery(PIZZAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There's an error: {error.message}</p>;
  console.log(data);
  console.dir(data);

  const films = data.meals.map(meals => <p>{meals.name}</p>);
  return (
    <div className="logo1">
      <header className="App-header">{films[1]}</header>
    </div>
  );
}
