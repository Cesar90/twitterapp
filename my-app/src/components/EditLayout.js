import React from "react";
import { getLocalStorageData } from "../helpers";

class EditLayout extends React.Component {
  state = {
    listOption: [{ name: "First" }, { name: "Second" }, { name: "Third" }],
    columns: [
      { position: "First", name: "Versaagency" },
      { position: "Second", name: "RainAgency" },
      { position: "Third", name: "Alexadevs" }
    ],
    numberTwittes: 30
  };

  goToStore = event => {
    event.preventDefault();
    this.props.history.push(`/`);
  };

  componentWillMount() {
    const { columns, numberTwittes } = getLocalStorageData();
    this.setState({ columns, numberTwittes });
  }

  handleChange = (columnToEdit, e) => {
    let columns = [...this.state.columns];
    
    //Find the column that will be interchangeable
    let columnToChange = columns.find(
      column => e.target.value === column.position
    );

    //Interchangeable position between two column
    let positionToChange = columnToEdit.position;
    let positionToEdit = columnToChange.position;
    columnToEdit.position = positionToEdit;
    columnToChange.position = positionToChange;
    //Get column that won't change of position
    let columnWithoutUpdate = columns.find(
      column =>
        columnToChange.name !== column.name && columnToEdit.name !== column.name
    );

    columns = [columnToEdit, columnToChange, columnWithoutUpdate];

    //it's necesary to keep the position initial of all columns
    const first = columns.find(item => item.name === "Versaagency");
    const second = columns.find(item => item.name === "RainAgency");
    const third = columns.find(item => item.name === "Alexadevs");
    this.setState({ columns: [first, second, third] });

    localStorage.setItem("columnsPositions", JSON.stringify(columns));
  };

  changeNumberTwittes = e => {
    localStorage.setItem("numberTwittes", e.target.value || 30);
  };

  render() {
    return (
      <div>
        <h2 className="titleForm"> Edit Layout </h2>
        <form className="store-selector fish-edit" onSubmit={this.goToStore}>
          <h3 className="titleForm"> Set order of column </h3>

          <div className="titleForm-selectOrder">
            <span> Versaagency </span>
            <select
              name="Versaagency"
              value={this.state.columns[0].position}
              onChange={e => this.handleChange(this.state.columns[0], e)}
            >
              {this.state.listOption.map((option, index) => (
                <option key={option.name}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className="titleForm-selectOrder">
            <span> RainAgency </span>
            <select
              name="RainAgency"
              value={this.state.columns[1].position}
              onChange={e => this.handleChange(this.state.columns[1], e)}
            >
              {this.state.listOption.map((option, index) => (
                <option key={option.name}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className="titleForm-selectOrder">
            <span> Alexadevs </span>
            <select
              name="Alexadevs"
              value={this.state.columns[2].position}
              onChange={e => this.handleChange(this.state.columns[2], e)}
            >
              {this.state.listOption.map((option, index) => (
                <option key={option.name}>{option.name}</option>
              ))}
            </select>
          </div>

          <h3 className="titleForm"> Number of tweets </h3>

          <input
            name="numberOfTwittes"
            type="number"
            onChange={this.changeNumberTwittes}
            placeholder="The number of tweets shown in each column"
            min="1"
            max="30"
            defaultValue={this.state.numberTwittes}
          />
          <button type="submit">Save config</button>
        </form>
      </div>
    );
  }
}

export default EditLayout;
