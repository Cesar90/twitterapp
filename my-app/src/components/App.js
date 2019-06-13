import React from "react";
import Header from "./Header";
import TweetContainer from "./TweetContainer";
import { getLocalStorageData } from "../helpers";
import { getTwittes } from "../api";

class App extends React.Component {
  state = {
    columns: [
      { position: "First", name: "Versaagency" },
      { position: "Second", name: "RainAgency" },
      { position: "Third", name: "Alexadevs" }
    ],
    columnsPosition: {
      First: 1,
      Second: 2,
      Third: 3
    },
    numberTwittes: 1
  };

  async componentWillMount() {
    const { columns, numberTwittes } = getLocalStorageData();
    const twittes = await getTwittes(numberTwittes);
    this.setState({ twittes, columns });
  }

  goToEditLayout = event => {
    event.preventDefault();
    this.props.history.push(`/editlayout`);
  };

  render() {
    return (
      <div>
        <label htmlFor="fold" onClick={this.goToEditLayout}>
          Edit layout
        </label>
        <div className="twittes">
          {/* order flexbox property used to order each column */}
          <div
            style={{
              order: this.state.columnsPosition[this.state.columns[0].position]
            }}
          >
            <Header tagline="Versa Agency" />
            {this.state.twittes && (
              <TweetContainer twittes={this.state.twittes[0].data} />
            )}
          </div>

          {/* order flexbox property used to order each column */}
          <div
            style={{
              order: this.state.columnsPosition[this.state.columns[1].position]
            }}
          >
            <Header tagline="Rain Agency" />
            {this.state.twittes && (
              <TweetContainer twittes={this.state.twittes[1].data} />
            )}
          </div>

          {/* order flexbox property used to order each column */}
          <div
            style={{
              order: this.state.columnsPosition[this.state.columns[2].position]
            }}
          >
            <Header tagline="Alex Adevs" />
            {this.state.twittes && (
              <TweetContainer twittes={this.state.twittes[2].data} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
