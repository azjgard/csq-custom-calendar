import React, { Component } from "react";
import "./ImageHiddenOnError.css";

import toProperCase from "../../utils";

class ImageHiddenOnError extends Component {
  state = {
    visible: true
  };

  render() {
    const visible = this.state.visible ? "visible" : "";
    return (
      <img
        src={this.props.src}
        style={this.props.style}
        onError={() => this.setState({ visible: false })}
        className={`HideOnError ${visible} ${this.props.className}`}
      />
    );
  }
}

export default ImageHiddenOnError;
