import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// TODO:
// We're reading from a fake database file here,
// but we need to actually read from a database in the future.

// Database import for testing
import db from "./fakedb.json";

// Components
import DataOptionGroup from "./components/DataOptionGroup/DataOptionGroup";
import PreviewWindow from "./components/PreviewWindow/PreviewWindow";

const configurations = db.configurations;

class App extends Component {
  constructor(props) {
    super(props);
    this.initializeState();
    this.initializePreviewWindowProps();
  }

  initializeState() {
    this.state = { currentOptions: {} };

    for (let i = 0; i < configurations.length; i++) {
      let cur = configurations[i];
      this.state.currentOptions[cur.name] = [cur.options[0].name];
    }
  }

  initializePreviewWindowProps() {
    this.previewWindowProps = {};
    for (let key in this.state.currentOptions) {
      this.previewWindowProps[key] = this.state.currentOptions[key];
    }
  }

  render() {
    return (
      <div className="App">
        <PreviewWindow
          currentOptions={this.state.currentOptions}
          config={configurations}
        />
        <DataOptionGroup
          data={configurations}
          callback={options => {
            this.setState({ currentOptions: options });
          }}
        />
      </div>
    );
  }
}

export default App;
