import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
import Visualization from "./components/visualization";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container-fluid">
          <Visualization />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
