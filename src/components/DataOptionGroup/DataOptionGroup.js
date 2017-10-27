import React, { Component } from "react";
import "./DataOptionGroup.css";

// Components
import DataOption from "../DataOption/DataOption";

class DataOptionGroup extends Component {
  state = {};

  constructor(props) {
    super(props);

    const configurations = this.props.data;

    // initialize state
    // (direct assignment is allowed in constructor)
    for (let i = 0; i < configurations.length; i++) {
      let cur = configurations[i];
      this.state[cur.name] = [cur.options[0].name];
    }
  }

  // Sets the attribute of the state
  // object when passed a key and a value
  setStateAttr(key, value, cb) {
    let obj = {};
    obj[key] = value;
    if (cb) {
      this.setState(obj, cb);
    } else {
      this.setState(obj);
    }
  }

  updateDataOption(name, option, isMounted) {
    // we don't want to trigger a change until the component has been rendered
    if (isMounted) {
      // kick the callback back out to the App level once the state has been updated
      this.setStateAttr(name, option, () => this.props.callback(this.state));
    }
  }

  render() {
    let dataOptions = [];

    const configurations = this.props.data;

    for (let i = 0; i < configurations.length; i++) {
      let cur = configurations[i];

      dataOptions.push(
        <DataOption
          name={cur.name} // the name of the option
          type={cur.type} // "and" or "or"
          options={cur.options} // the internal choices of the option
          index_dataOption={i} // index for unique interal keys
          callback={(option, isMounted) => {
            // callback to update our state here in DataOptionGroup
            this.updateDataOption(cur.name, option, isMounted);
          }}
          key={`${cur.name}-${i}`} // the unique key for react
        />
      );
    }

    return <div className="DataOptionGroup">{dataOptions}</div>;
  }
}

export default DataOptionGroup;
