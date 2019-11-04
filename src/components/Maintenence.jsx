import React, { Component } from "react";
import AppConfig from "../appConfig.json";
import Modal from "react-responsive-modal";
import "bootstrap/dist/css/bootstrap.css";
import "react-dropdown/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Maintenence extends Component {
  state = {
    startDate: new Date(),
    allMaintenence: []
  };
  getAllMaintenenceInfo = flatInfo => {
    debugger;
    if (!flatInfo.Id || flatInfo.Id == 0)
      return (
        <div>
          <center>
            <div
              key={flatInfo.Name}
              className="card"
              style={{
                margin: 20,
                width: 500,
                height: 200,
                display: "inline-block",
                boxShadow:
                  "0 2px 5px 0 rgba(0,0,0,.50), 0 2px 10px 0 rgba(0,0,0,.12)"
              }}
            />
          </center>
        </div>
      );
    return (
      <div>
        <div
          key={flatInfo.Name}
          className="card"
          style={{
            margin: 20,
            width: 500,
            height: 300,
            display: "inline-block",
            boxShadow:
              "0 2px 5px 0 rgba(0,0,0,.50), 0 2px 10px 0 rgba(0,0,0,.12)"
          }}
        >
          <div className="card-header">
            <div style={{ textAlign: "right" }}>
              <i
                className="fa fa-pencil fa-lg"
                onClick={() => this.editItem(flatInfo.Id)}
                aria-hidden="true"
              />
            </div>
            {flatInfo.Name}
          </div>
        </div>
      </div>
    );
  };
  componentDidMount() {
    let now = new Date();
    let month = now.getMonth() - 1;
    let year = now.getFullYear();
    if (month < 0) {
      month = 11;
      --year;
    }
    var test = [
      { Name: "Apartment" },
      { Name: "G1", Id: 1 },
      { Name: "G2", Id: 2 },
      { Name: "101", Id: 3 },
      { Name: "102", Id: 1 }
    ];
    this.setState({
      startDate: new Date(year, month, 1),
      allMaintenence: test
    });
  }
  render() {
    return (
      <div>
        <div style={{ marginTop: 50 }}>
          <center>
            <DatePicker
              selected={this.state.startDate}
              onChange={date => this.setState({ startDate: date })}
              placeholderText="Maintenence Period"
              dateFormat="    yyyy - MMMM"
              showMonthYearPicker
              showYearDropdown
            />
            <button
              className="btn btn-success"
              style={{ height: 30, marginLeft: 20, marginTop: -5 }}
            >
              <span style={{ position: "relative", top: -5 }}>Fetch</span>
            </button>
          </center>
        </div>
        <div>
          {this.state.allMaintenence
            .filter(function(aparment) {
              return !aparment.Id || aparment.Id == 0;
            })
            .map(flatInfo => this.getAllMaintenenceInfo(flatInfo))}
        </div>
        <div className="form-group row" style={{ maxWidth: 1200 }}>
          {this.state.allMaintenence
            .filter(function(flat) {
              return flat.Id && flat.Id != 0;
            })
            .map(flatInfo => this.getAllMaintenenceInfo(flatInfo))}
        </div>
      </div>
    );
  }
}

export default Maintenence;
