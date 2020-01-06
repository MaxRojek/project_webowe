import React from "react";

import "./Pizzas.css";

class Menu extends React.Component {
  /// pierwsza tabela
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

class Table extends React.Component {
  state = {
    data: [
      { id: 1, title: "max", time: "13:30-14:00", type: "Improvement", complete: 100 },
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
            <td onClick={() => this.sortBy("id")}>ID</td>
            <td onClick={() => this.sortBy("title")}>Title</td>
            <td onClick={() => this.sortBy("priority")}>time</td>
            <td onClick={() => this.sortBy("type")}>Issue Type</td>
            <td onClick={() => this.sortBy("complete")}>% Complete</td>
          </tr>
        </thead>
        <tbody className="body">{rows}</tbody>
      </table>
    );
  }
}

function Pizzas() {
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
        <div>3</div>
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
    </div>
  );
}

export default Pizzas;
