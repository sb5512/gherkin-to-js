import React, { Component } from "react";
import convertGherkin from "../gherkinConvertor.js";
import gif from "./gherkinGif.gif";
var ReactDOM = require("react-dom");
var GifPlayer = require("react-gif-player");

class GherkinEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", result: "Result" };
  }
  handleChange = event => {
    this.setState({
      value: event.target.value,
      result: this.getResult(event.target.value)
    });
  };

  getResult = input => {
    return convertGherkin(input);
  };

  render() {
    return (
      <div>
        <label for="title">
          Type your BDD syntax and get it to Javascript{" "}
        </label>
        <br />
        <textarea
          placeholder="Place your gherkin synatx here..."
          rows="40"
          cols="70"
          id="title"
          name="title"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <textarea
          rows="40"
          cols="70"
          id="noter-text-area"
          name="textarea"
          value={this.state.result}
        />
        <GifPlayer gif={gif} autoplay={true} />
      </div>
    );
  }
}

export default GherkinEditor;
