import React from "react";

import "./Pizzas.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
class Menu extends React.Component {
  // pierwsza tabela
  componentWillMount() {
    this.arr = [
      {
        name: "Mahesh",
        age: "22",
        salary: 23000,
        time: 13.2
      },
      {
        name: "John",
        age: "25",
        salary: 23000,
        time: 13.2
      },
      {
        name: "Ron",
        age: "35",
        salary: 45000,
        time: 13.2
      },
      {
        name: "Kim",
        age: "55",
        salary: 60000,
        time: 13.2
      }
    ];

    this.tempArr = this.arr.map(function(obj) {
      return (
        <tr>
          <td>{obj.name}</td>
          <td>{obj.age}</td>
          <td>{obj.salary}</td>
          <td>{obj.time}</td>
          <td>
            <button type="button">Click Me!</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <td>Name</td>
            <td>Age</td>
            <td>Salary</td>
            <td>time</td>
            <td>Make Order</td>
          </tr>
        </thead>

        <tbody>{this.tempArr}</tbody>
      </table>
    );
  }
}

//////////////////////////////// kolejna tabela/////////////////////////////////////////////////////////////////////////////////////////

const Row = ({ id, title, time, type, complete, remove }) => (
  <tr>
    <td className="remove">
      <button type="button" onClick={() => remove(id)} class="btn btn-outline-success">
        +
      </button>
    </td>
    <td>{id}</td>
    <td>{title}</td>
    <td>{time}</td>
    <td>{type}</td>
    <td>{complete}</td>
  </tr>
);

const stoliki = gql`
  query MyQuery {
    Tables {
      id
      outdoor
      size
      start_time
      end_time
    }
  }
`;
const PIZZAS = gql`
  query pizzas {
    meals(limit: 2) {
      id
      name
    }
  }
`;

class Table extends React.Component {
  state = {
    data: [
      { id: 1, title: "max", time: "13:30-14:00", type: "Improvement", complete: 45 },
      { id: 2, title: "Test", time: "13:30-14:30", type: "Improvement", complete: 30 },
      { id: 3, title: "shrek", time: "13:00-15:00", type: "Story", complete: 66 }
    ]
  };

  /* 
     I like to write it this way to explicity state that a function is being returned
     But you could simplify this by using arrow syntax twice,
    
     compareBy = (key) => (a,b) => { ...... }
  */
  compareBy = key => {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  };

  sortBy = key => {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ data: arrayCopy });
  };

  remove = rowId => {
    // tutaj jest usuwanie wiersza
    // Array.prototype.filter returns new array
    // so we aren't mutating state here
    alert("usuwam wiadomość");
    const arrayCopy = this.state.data.filter(row => row.id !== rowId);
    this.setState({ data: arrayCopy });
  };

  render() {
    const rows = this.state.data.map(rowData => <Row remove={this.remove} {...rowData} />);

    return (
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <td className="remove"></td>

            <td onClick={() => this.sortBy("id")}>id</td>
            <td onClick={() => this.sortBy("title")}>size</td>
            <td onClick={() => this.sortBy("priority")}>outdoor</td>
            <td onClick={() => this.sortBy("type")}>start_time</td>
            <td onClick={() => this.sortBy("complete")}>end_time</td>
          </tr>
        </thead>
        <tbody className="body">{rows}</tbody>
      </table>
    );
  }
}

function Pizzas() {
  function saveInfo() {
    alert("Kliknięto w link.");
  }

  const { loading, error, data } = useQuery(stoliki);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>There's an error: {error.message}</p>;
  console.log(data);
  console.dir(data);
  const table_id = data.Tables.map(Tables => <p>{Tables.id}</p>);
  const table_outdoor = data.Tables.map(Tables => <p>{Tables.outdoor.toString()}</p>);
  const table_size = data.Tables.map(Tables => <p>{Tables.size}</p>);
  const table_start_time = data.Tables.map(Tables => <p>{Tables.start_time}</p>);
  const table_end_time = data.Tables.map(Tables => <p>{Tables.end_time}</p>);
  console.log(table_outdoor);
  /////////////////////////////////////// połączenie z bazą///////////////////////////////////////////////////////////////

  const items = [];

  for (const [index, value] of table_id.entries()) {
    items.push(
      <tr>
        <th scope="row">{table_id[index]}</th>
        <td>{table_size[index]}</td>
        <td>{table_outdoor[index]}</td>
        <td>{table_start_time[index]}</td>
        <td>{table_end_time[index]}</td>
        <td>
          <a
            href="#"
            //onClick={saveInfo}
            class="btn btn-secondary btn-lg active"
            role="button"
            aria-pressed="true"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            +
          </a>
        </td>
      </tr>
    );
  }
  return (
    <div id="navigation">
      <div class="flex-container">
        <div>
          <p>
            <a
              class="btn btn-primary"
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Order Pizza
            </a>
          </p>
        </div>
        <div>
          <a
            class="btn btn-primary"
            data-toggle="collapse"
            href="#collapseExample2"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Book table!
          </a>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-secondary"
            data-toggle="collapse"
            href="#collapseExample3"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Zamów stolik
          </button>
        </div>
      </div>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <Menu />
        </div>
      </div>
      <div class="collapse" id="collapseExample2">
        <div class="card card-body">
          <Table />
        </div>
      </div>
      <div class="collapse" id="collapseExample3">
        <div class="card card-body">
          <div class="container table-responsive py-5">
            <table class="table table-bordered table-hover">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">size</th>
                  <th scope="col">outdoor</th>
                  <th scope="col">start_time</th>
                  <th scope="col">end_time</th>
                  <th scope="col">Order</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">0</th>
                  <td>3</td>
                  <td>true</td>
                  <td>04:10:00</td>
                  <td>04:40:00</td>
                  <td>
                    <a
                      href="#"
                      onClick={saveInfo}
                      class="btn btn-secondary btn-lg active"
                      role="button"
                      aria-pressed="true"
                    >
                      +
                    </a>
                  </td>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Twój Koszyk
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="input-group">
                  <div class="input-group-prepend" />
                  <span class="input-group-text" id="">
                    First and last name
                  </span>
                </div>
                <input type="text" class="form-control" />
                <input type="text" class="form-control" />
              </div>
            </div>

            <div class="modal-footer" />
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pizzas;
