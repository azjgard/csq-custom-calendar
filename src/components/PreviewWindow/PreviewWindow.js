import React, { Component } from "react";
import "./PreviewWindow.css";

const rootPath = "/images";

// TODO:
// Need to pre-cache all of the images so that
// we don't have to worry about load times when
// using the calendar builder.
// looping through everything in the data should
// do the trick.

class PreviewWindow extends Component {
  preview = [];
  images = {};

  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(this.props, nextProps)) {
      this.setState(nextProps);
    }
  }

  // This will run the first time that the component renders.
  // It preloads all of the images so that loading times
  // are snappy for the user while he or she is using the app.
  preloadImages() {
    for (let c in this.props.config) {
      const config = this.props.config[c];
      const configName = config.name;
      const configOptions = config.options;

      for (let co in configOptions) {
        const option = configOptions[co];
        const optionName = option.name;

        const img = new Image();
        const imagePath = `${rootPath}/${configName}/${optionName}.png`;
        img.src = imagePath;
      }
    }
    this.imagesPreloaded = true;
  }

  // TODO:
  // We need to pass in more information about each
  // option that is tracked in the state.. in this case,
  // so that we can set the z-index dynamically accordingly
  // to what the user sets in the backend UI.
  getPreview() {
    let preview = [];

    // TODO:
    // refactor this code so that it is more readable,
    // and similar in nature to the preloadImages function.
    // it's possible that we should just refactor THAT function
    // into something more generic to use in these two instances.

    // this.state.currentOptions[name] is an array simply
    // for the sake of supporting checkboxes vs radio buttons
    // in the future, but as of right now, we'll always
    // use the item at index 0 because we only have radio
    // buttons.
    for (let name in this.state.currentOptions) {
      const current = this.state.currentOptions[name][0];
      const path = `${rootPath}/${name}/${current}.png`;

      let props = {};
      if (name === "frame" || name === "title" || name === "design") {
        props["style"] = { zIndex: 999 };
      }

      preview.push(
        <img className={`overlay ${name}`} src={path} key={path} {...props} />
      );
    }
    return preview;
  }

  render() {
    const preview = this.getPreview();

    if (!this.imagesPreloaded) {
      this.preloadImages();
    }

    return (
      <div className="PreviewWindow">
        <div>{preview}</div>
      </div>
    );
  }
}

export default PreviewWindow;
