import React, { Component } from "react";
import AppConfig from "../appConfig.json";
import "font-awesome/css/font-awesome.min.css";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";

class WaterReading extends Component {
  state = { selectedMonth: new Date(), waterReadings: [], allFlats: [] };
  componentDidMount() {
    var { selectedMonth } = { ...this.state };
    selectedMonth.setMonth(selectedMonth.getMonth() - 1);
    this.setState({ selectedMonth });
    this.fetchFlatsInfo();
  }
  fetchFlatsInfo = () => {
    fetch(AppConfig.API_URL + "/api/FlatMember")
      .then(response => response.json())
      .then(data => {
        this.setState({ allFlats: data });
        if (this.state.allFlats.length === 0) {
          this.validateFlatsInfo();
        }
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  validateFlatsInfo = () => {
    this.setState({
      modalHeader: "No Flats added",
      modalBody:
        "There are no Flats added. Please add some flats and add maintenence later.",
      modalYesText: "OK",
      modalNoText: "",
      modalResponseYes: this.closeModal,
      openModal: true
    });
  };
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <center>
          <DatePicker
            selected={this.state.selectedMonth}
            onChange={date => this.setState({ selectedMonth: date })}
            placeholderText="Maintenence Period"
            dateFormat="    yyyy - MMMM"
            showMonthYearPicker
            showYearDropdown
          />
          <button
            className="btn btn-success"
            style={{ height: 30, marginLeft: 20, marginTop: -5 }}
            onClick={this.fetchWaterMaintenence}
          >
            <span style={{ position: "relative", top: -5 }}>Fetch</span>
          </button>
        </center>
        <br />
        {this.renderGrid()}
        <button
          className="btn btn-success pull-right"
          style={{
            height: 30,
            marginRight: "10%",
            marginTop: -5,
            visibility: this.state.isDataUpdated ? "visible" : "hidden"
          }}
          onClick={this.uploadReadings}
        >
          <span style={{ position: "relative", top: -5 }}>Upload</span>
        </button>
      </div>
    );
  }
  uploadReadings = () => {
    fetch(AppConfig.API_URL + "/api/WaterMaintenence", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.waterReadings)
    })
      .then(data => {
        if (!data.ok) {
          toast.error(data.statusText);
        } else {
          toast.success("Uploaded successfully");
          this.fetchWaterMaintenence();
        }
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  renderGrid = () => {
    return (
      <Table hover style={{ width: "90%", marginLeft: 20 }}>
        <thead>
          <tr>
            <th>Flat</th>
            <th>Old Reading</th>
            <th>New Reading</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          {this.state.waterReadings.map((waterReading, index) => (
            <tr key={waterReading.Id}>
              <td>
                <p style={{ marginTop: 7 }}>{waterReading.Flat.Name}</p>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Old Reading"
                  value={waterReading.OldReading}
                  onChange={e => this.handleOldReadingChanged(e, index)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Reading"
                  value={waterReading.NewReading}
                  onChange={e => this.handleNewReadingChanged(e, index)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Readings"
                  value={waterReading.Reading}
                  onChange={e => this.handleTotalReadingChanged(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  updateTotalReadings = index => {
    var { waterReadings } = { ...this.state };
    var readingDiff =
      waterReadings[index].NewReading - waterReadings[index].OldReading;
    waterReadings[index].Reading = readingDiff;
    this.setState({ waterReadings });
  };
  gridIsMadeDirty = () => {
    if (!this.state.isDataUpdated) {
      this.setState({ isDataUpdated: true });
    }
  };
  handleOldReadingChanged = (e, index) => {
    var { waterReadings } = { ...this.state };
    if (e.target.value == "") {
      waterReadings[index].OldReading = "";
    } else {
      waterReadings[index].OldReading = parseInt(e.target.value);
    }
    this.setState({ waterReadings });
    this.updateTotalReadings(index);
    this.gridIsMadeDirty();
  };
  handleNewReadingChanged = (e, index) => {
    var { waterReadings } = { ...this.state };
    if (e.target.value == "") {
      waterReadings[index].NewReading = "";
    } else {
      waterReadings[index].NewReading = parseInt(e.target.value);
    }
    this.setState({ waterReadings });
    this.updateTotalReadings(index);
    this.gridIsMadeDirty();
  };
  handleTotalReadingChanged = (e, index) => {
    var { waterReadings } = { ...this.state };
    if (e.target.value == "") {
      waterReadings[index].Reading = "";
    } else {
      waterReadings[index].Reading = parseInt(e.target.value);
    }
    this.setState({ waterReadings });
    this.gridIsMadeDirty();
  };
  fetchWaterMaintenence = () => {
    var requestDate =
      this.state.selectedMonth.getFullYear() +
      "" +
      (this.state.selectedMonth.getMonth() < 9
        ? "0" + (this.state.selectedMonth.getMonth() + 1)
        : this.state.selectedMonth.getMonth() + 1);
    fetch(
      AppConfig.API_URL +
        "/api/WaterMaintenence?maintenencePeriod=" +
        requestDate
    )
      .then(response => response.json())
      .then(data => {
        if (data.ExceptionMessage) {
          toast.error(data.ExceptionMessage);
          return;
        }
        data.map(reading => {
          reading.Reading = reading.NewReading - reading.OldReading;
        });
        this.setState({ waterReadings: data, isDataUpdated: false });
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
}

export default WaterReading;
