import React from "react";
import "./Booktable.css";

const Row = ({ id, title, priority, type, complete, remove }) => (
  <div className="row">
    <div className="remove">
      <a href="#" onClick={() => remove(id)}>
        X
      </a>
    </div>
    <div>{id}</div>
    <div>{title}</div>
    <div>{priority}</div>
    <div>{type}</div>
    <div>{complete}</div>
  </div>
);

class Table extends React.Component {
  state = {
    data: [
      { id: 403, title: "Task 403", priority: "High", type: "Improvement", complete: 100 },
      { id: 532, title: "Task 532", priority: "Medium", type: "Improvement", complete: 30 },
      { id: 240, title: "Task 240", priority: "High", type: "Story", complete: 66 }
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
    // Array.prototype.filter returns new array
    // so we aren't mutating state here
    const arrayCopy = this.state.data.filter(row => row.id !== rowId);
    this.setState({ data: arrayCopy });
  };

  render() {
    const rows = this.state.data.map(rowData => <Row remove={this.remove} {...rowData} />);

    return (
      <div className="table">
        <div className="header">
          <div className="remove"></div>
          <div onClick={() => this.sortBy("id")}>ID</div>
          <div onClick={() => this.sortBy("title")}>Title</div>
          <div onClick={() => this.sortBy("priority")}>Priority</div>
          <div onClick={() => this.sortBy("type")}>Issue Type</div>
          <div onClick={() => this.sortBy("complete")}>% Complete</div>
        </div>
        <div className="body">{rows}</div>
      </div>
    );
  }
}

export default Table;
