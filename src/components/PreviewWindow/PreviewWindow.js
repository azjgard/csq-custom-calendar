import React, { Component } from "react";
import "./PreviewWindow.css";

const rootPath = "/images";

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

  // TODO:
  // We need to pass in more information about each
  // option that is tracked in the state.. in this case,
  // so that we can set the z-index dynamically accordingly
  // to what the user sets in the backend UI.
  getPreview() {
    let preview = [];
    for (let name in this.state.currentOptions) {
      const current = this.state.currentOptions[name][0];
      const path = `${rootPath}/${name}/${current}.png`;

      let props = {};
      if (name === "frame") {
        props["style"] = { zIndex: 999 };
      }

      preview.push(
        <img className="overlay" src={path} key={path} {...props} />
      );
    }
    return preview;
  }

  render() {
    let preview = this.getPreview();
    return (
      <div className="PreviewWindow">
        <div>{preview}</div>
      </div>
    );
  }
}

export default PreviewWindow;
