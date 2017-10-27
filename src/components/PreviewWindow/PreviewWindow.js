import React, { Component } from "react";
import "./PreviewWindow.css";

// TODO:
// Add overlaying image components that get their source updated
// everytime the state here changes

class PreviewWindow extends Component {
  preview = [];

  constructor(props) {
    super(props);

    this.state = this.props;
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(this.props, nextProps)) {
      this.setState(nextProps);
    }
  }

  getPreview() {
    let preview = [];
    for (let i in this.state.currentOptions) {
      preview.push(
        <p key={i}>
          {i}: {this.state.currentOptions[i][0]}
        </p>
      );
    }
    return preview;
  }

  render() {
    let preview = this.getPreview();
    return <div className="PreviewWindow">{preview}</div>;
  }
}

export default PreviewWindow;
