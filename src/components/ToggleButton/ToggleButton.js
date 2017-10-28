import React, { Component } from "react";
import "./ToggleButton.css";

import toProperCase from "../../utils";

// A ToggleButton to replace the browser's
// default radio button. Expects state
// to be passed to it from its parent via
// props.

// Props:
// - name = the name of the ToggleButton.
// - checked = whether or not the ToggleButton is checked.
// - onClick = function to call when the toggle is clicked.
// - showName = boolean that determines whether or not to render the
// name of the ToggleButton with the button itself.
class ToggleButton extends Component {
  state = {};

  constructor(props) {
    super(props);

    // initialize state
    this.state.checked = props.checked;
  }

  // when the props change and the new props have a,
  // checked attribute, adjust the ToggleButton's
  // match.
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty("checked")) {
      this.setState({ checked: nextProps.checked });
    }
  }

  render() {
    // add 'checked' to the className if this.state.checked is true.
    let className = `ToggleButton ${this.state.checked ? "checked" : ""}`;

    // call the onClick prop when this is clicked.
    let onClick = () => this.props.onClick(this.props.name);

    let showName = this.props.showName ? (
      <span>{toProperCase(this.props.name)}</span>
    ) : null;

    return (
      <div className="ToggleButtonContainer">
        <button className={className} onClick={onClick} />
        {showName}
      </div>
    );
  }
}

export default ToggleButton;
