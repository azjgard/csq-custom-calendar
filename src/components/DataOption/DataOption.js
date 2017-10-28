import React, { Component } from "react";
import "./DataOption.css";

import toProperCase from "../../utils";

// Components
import ToggleButton from "../ToggleButton/ToggleButton";

// TODO:
// Create a custom checkbox component that implements
// the same props as a native React checkbox.
// This is so we can style them however we want.

// TODO:
// Replace the input below with the custom component.
function And(props) {
  return (
    <span key={props.option}>
      <label htmlFor={props.option}>{props.option}</label>
      <input
        type="checkbox"
        name={props.option}
        defaultChecked={props.selected}
        onChange={() => props.callback(props.option)}
      />
    </span>
  );
}

// TODO:
// Create a custom radio button component that implements
// the same props as a native React radio button.
// This is so we can style them however we want.

// TODO:
// Replace the input below with the custom component.
function Or(props) {
  return (
    <span>
      <ToggleButton
        name={props.option}
        checked={props.selected}
        onClick={props.callback}
        showName={true}
      />
    </span>
  );
}

class DataOption extends Component {
  state = {};
  options = [];
  selected = null;
  mounted = false;

  componentDidMount() {
    this.getOptions();
    this.mounted = true;
  }

  // Initializes internal options based on
  // the options prop that is passed to the component
  getOptions() {
    const optionProps = this.props.options;

    for (let i = 0; i < optionProps.length; i++) {
      this.options.push(`${optionProps[i].name}`);

      let tf = i === 0; // true or false

      this.setStateAttr(this.options[i], tf);
    }
  }

  // TODO:
  // implement this function as an extension of the
  // React Component's prototype

  // Sets the attribute of the state
  // object when passed a key and a value.
  // A callback function to be executed
  // once the state has been updated is
  // optional.
  setStateAttr(key, value, cb) {
    let obj = {};
    obj[key] = value;
    if (cb) {
      this.setState(obj, cb);
    } else {
      this.setState(obj);
    }
  }

  // returns an array of currently selected options
  getSelected() {
    return this.selected;
  }

  // sets the component state to match the currently selected options
  setSelected() {
    let selected = [];
    for (let key in this.state) {
      if (this.state[key] === true) {
        selected.push(key);
      }
    }
    this.selected = selected;
    this.props.callback(this.selected, this.mounted);
  }

  // Called to update the state of the DataOption everytime an
  // OR is clicked
  updateOr(option) {
    // set every option to false except for the option that was
    // clicked.
    for (let i = 0; i < this.options.length; i++) {
      // only propagate the callback to the parent component
      // if we've set the state for the last option
      if (i < this.options.length - 1) {
        this.setStateAttr(this.options[i], this.options[i] === option);
      } else {
        this.setStateAttr(
          this.options[i],
          this.options[i] === option,
          this.setSelected
        );
      }
    }
  }

  // Called to update the state of the DataOption everytime an
  // AND is clicked
  updateAnd(option) {
    this.setStateAttr(option, !this.state[option], this.setSelected);
  }

  render() {
    const index_dataOption = this.props.index_dataOption;
    const pk = `${this.props.name}-${index_dataOption}`;

    let options = [];

    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      if (this.props.type === "and") {
        options.push(
          <And
            key={`${pk}-${i}`}
            callback={this.updateAnd.bind(this)}
            option={option}
            selected={i === 0}
          />
        );
      } else if (this.props.type === "or") {
        options.push(
          <Or
            key={`${pk}-${i}`}
            pk={pk}
            option={option}
            selected={this.state[option]}
            callback={this.updateOr.bind(this)}
          />
        );
      }
    }
    return (
      <div className="DataOption">
        <h2>{toProperCase(this.props.name)}</h2>
        {options}
      </div>
    );
  }
}

export default DataOption;
