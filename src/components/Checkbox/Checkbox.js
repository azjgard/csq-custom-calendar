import React, { Component } from "react";
import "./Checkbox.css";

class Checkbox extends Component {
  state = {};

  static defaultProps = {
    checked: false
  };

  constructor(props) {
    super(props);
    this.state.checked = props.defaultChecked;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty("checked")) {
      this.setState({ checked: nextProps.checked });
    }
  }

  // Actually, this isn't a toggle like a checkbox.. so we shouldn't
  // have to track state internally. Clicking on a radio button that
  // is already selected shouldn't unselected the radio button.

  render() {
    return (
      <div
        className={`Checkbox ${this.state.checked ? "checked" : ""}`}
        onClick={() => this.props.onChange(this.props.name)}
        // onClick={() => {
        //   this.setState({ checked: !this.state.checked }, () => {
        //     if (this.props.onChange) {
        //       this.props.onChange(this.props.name, this.state.checked);
        //     }
        //   });
        // }}
      />
    );
  }
}

export default Checkbox;
