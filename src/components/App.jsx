import React, { Component } from "react";
import MaintenenceItem from "./MaintenenceItem";
import Home from "./Home";
import Navbar1 from "./Navbar1";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Flat from "./Flat";
import People from "./People";
import Test from "./Test";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Maintenence from "./Maintenence";
import WaterReading from "./WaterReading";

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer position="top-right" />
        <Router>
          <Navbar1 />
          <Route path="/" />
          <Route path="/home" component={Home} />
          <Route path="/flat" component={Flat} />
          <Route path="/people" component={People} />
          <Route path="/apt" component={Test} />
          <Route path="/maintenenceItems" component={MaintenenceItem} />
          <Route path="/waterReadings" component={WaterReading} />
          <Route path="/maintenence" component={Maintenence} />
        </Router>
      </div>
    );
  }
}

export default App;
