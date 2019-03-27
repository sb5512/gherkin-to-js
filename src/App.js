import React, { Component } from "react";
import "./App.css";
import GherkinEditor from "./components/Editor";

class App extends Component {
  componentDidMount() {
    document.title = "Sabin Gherkin Convertor";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GherkinEditor />
        </header>
      </div>
    );
  }
}

export default App;
