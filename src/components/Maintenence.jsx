import React, { Component } from "react";
import AppConfig from "../appConfig.json";
import "bootstrap/dist/css/bootstrap.css";
import "react-dropdown/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import ReactModal from "./Modal/ReactModal";
import MaintenenceEditor from "./Modal/MaintenenceEditor";
import WaterMaintenenceEditor from "./Modal/WaterMaintenenceEditor.jsx";

class Maintenence extends Component {
  state = {
    startDate: new Date(),
    allMaintenence: {
      IsCreated: false,
      WaterMaintenences: [],
      MaintenenceItems: [],
      Maintenence: { Id: 0, Period: "" }
    },
    allFlats: [],
    openModal: false,
    openEditor: false,
    openWaterMaintenenceEditor: false,
    modalHeader: "",
    modalBody: "",
    modalYesText: "",
    modalNoText: "",
    allItems: [],
    waterMaintenenceItems: []
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
  fetchFlatInfo = () => {
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
  handleItemChange = (e, index) => {
    var { allMaintenence } = { ...this.state };
    allMaintenence.MaintenenceItems[index].Id = parseInt(e.target.value);
    this.setState({ allMaintenence });
  };
  handlePriceChange = (e, index) => {
    var { allMaintenence } = { ...this.state };
    allMaintenence.MaintenenceItems[index].Amount = parseInt(e.target.value);
    this.setState({ allMaintenence });
  };
  handleNotesChange = (e, index) => {
    var { allMaintenence } = { ...this.state };
    allMaintenence.MaintenenceItems[index].Notes = e.target.value;
    this.setState({ allMaintenence });
  };
  placePencilIcon = flatId => {
    if (!flatId || flatId == 0) {
      return (
        <i
          className="fa fa-pencil fa-sm"
          onClick={this.openEditorModal}
          aria-hidden="true"
        />
      );
    }
  };
  generateCard = (flatInfo, height, isFlat) => {
    if (!flatInfo.Flat.Id || flatInfo.Flat.Id == 0) {
      height = height + 22;
    }
    return (
      <div key={flatInfo.Flat.Name}>
        <div
          key={flatInfo.Flat.Name}
          className="card"
          style={{
            margin: 20,
            width: 350,
            height: height,
            display: "inline-block",
            boxShadow:
              "0 2px 5px 0 rgba(0,0,0,.50), 0 2px 10px 0 rgba(0,0,0,.12)"
          }}
        >
          <div className="card-header">
            <div className="text-right">
              {this.placePencilIcon(flatInfo.Flat.Id)}
            </div>
            <h3>
              <span>{flatInfo.Flat.Name}</span>
            </h3>
          </div>
          {this.getDetailedMaintenenceInfo(flatInfo, isFlat)}
          <div className="card-footer text-right">
            <h3>
              <span className="align-middle">{this.getAmount(isFlat)}</span>
            </h3>
          </div>
        </div>
      </div>
    );
  };
  getAmount = isFlat => {
    debugger;
    var amount = this.state.allMaintenence.MaintenenceItems.reduce(
      (total, item) => total + item.Amount,
      0
    );
    if (isFlat) return Math.ceil(amount / this.state.allFlats.length);

    return Math.ceil(amount);
  };
  getDetailedAmount = (amount, isFlat) => {
    if (isFlat) return Math.ceil(amount / this.state.allFlats.length);

    return amount;
  };
  getAllMaintenenceInfo = flatInfo => {
    if (this.state.allMaintenence.MaintenenceItems.length > 0) {
      var height = 140 + this.state.allMaintenence.MaintenenceItems.length * 32;
      if (!flatInfo.Id || flatInfo.Id == 0) {
        flatInfo.Flat.Name = AppConfig.ApartmentName;
        return (
          <div key={flatInfo.Flat.Name}>
            <center>{this.generateCard(flatInfo, height, false)}</center>
          </div>
        );
      }
      return (
        <div key={flatInfo.Flat.Name}>
          {this.generateCard(flatInfo, height, true)}
        </div>
      );
    }
  };
  getDetailedMaintenenceInfo = (flatInfo, isFlat) => {
    return (
      <div>
        {this.state.allMaintenence.MaintenenceItems.filter(function(item) {
          if (item.MaintenenceItem) {
            return item;
          }
        }).map(maintenenceInfo => (
          <div className="text-center" key={maintenenceInfo.Name}>
            <div className="row">
              <div className="col-sm-7">
                <label>{maintenenceInfo.MaintenenceItem.Name}</label>
              </div>
              <div className="col-sm-2">
                <label>
                  {this.getDetailedAmount(maintenenceInfo.Amount, isFlat)}
                </label>
              </div>
              <div className="col-sm-1" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  componentDidMount() {
    fetch(AppConfig.API_URL + "/api/MaintenenceItem")
      .then(response => response.json())
      .then(data => {
        this.setState({ allItems: data });
      })
      .catch(function(error) {
        toast.error(error.message);
      });

    this.fetchFlatInfo();
  }
  fetchMaintenence = () => {
    if (this.state.allFlats.length === 0) {
      this.validateFlatsInfo();
      return;
    }
    var requestDate =
      this.state.startDate.getFullYear() +
      "" +
      (this.state.startDate.getMonth() < 9
        ? "0" + (this.state.startDate.getMonth() + 1)
        : this.state.startDate.getMonth() + 1);
    debugger;
    fetch(
      AppConfig.API_URL + "/api/Maintenence?maintenencePeriod=" + requestDate
    )
      .then(response => response.json())
      .then(data => {
        if (!data.IsCreated) {
          this.setState({
            modalHeader: "No Data Found",
            modalBody:
              "There is no maintenence for the period selected. Would you like to add new data?",
            openModal: true,
            modalResponseYes: this.modalResponseYes,
            modalYesText: "Yes",
            modalNoText: "No"
          });
        } else {
          this.setState({ allMaintenence: data });
        }
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };

  openModal = () => {
    this.setState({ openModal: true });
  };
  closeModal = () => {
    this.setState({ openModal: false });
  };
  modalResponseNo = () => {
    this.closeModal();
  };
  openEditorModal = () => {
    this.setState({ openEditor: true });
  };
  modalResponseYes = () => {
    this.setState({
      allMaintenence: {
        IsCreated: false,
        WaterMaintenences: [],
        MaintenenceItems: [],
        Maintenence: { Id: 0, Period: "" }
      }
    });
    this.closeModal();
    this.openEditorModal();
  };
  openWaterMaintenenceEditor = () => {
    fetch(AppConfig.API_URL + "/api/Maintenence")
      .then(response => response.json())
      .then(data => {
        this.setState({ allItems: data });
      })
      .catch(function(error) {
        toast.error(error.message);
      });
    // var waterMaintenence = this.state.allMaintenence.MaintenenceItems.filter(function(item){
    //   return item.
    // })
    this.setState({
      openWaterMaintenenceEditor: true
    });
  };
  closeEditor = () => {
    this.setState({ openEditor: false });
  };
  closeWaterEditor = () => {
    this.setState({ openWaterMaintenenceEditor: false });
  };
  getMaintnenceToPost = () => {
    var { allMaintenence } = { ...this.state };
    var period =
      this.state.startDate.getFullYear() +
      "" +
      (this.state.startDate.getMonth() + 1);
    allMaintenence.Maintenence = { Period: period };
    this.setState({ allMaintenence });
    return this.state.allMaintenence;
  };
  saveWaterMaintenence = () => {
    fetch(AppConfig.API_URL + "/api/Maintenence", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.getMaintnenceToPost())
    })
      .then(data => {
        if (!data.ok) {
          toast.error(data.statusText);
        } else {
          this.closeEditor();
        }
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };

  addItem = () => {
    var emptyItem = this.state.allMaintenence.MaintenenceItems.filter(function(
      maintenenceItem
    ) {
      return maintenenceItem.Id == -1;
    });
    if (emptyItem.length > 0) {
      toast.error("Please fill the data which is empty.");
    } else {
      var allMaintenence = { ...this.state.allMaintenence };
      allMaintenence.MaintenenceItems.push({
        Id: -1,
        Amount: 0.0
      });
      this.setState({ allMaintenence });
    }
  };
  render() {
    return (
      <div style={{ overflowX: "hidden" }}>
        <MaintenenceEditor
          onOpenModal={this.state.openEditor}
          handleItemChange={this.handleItemChange}
          handlePriceChange={this.handlePriceChange}
          handleNotesChange={this.handleNotesChange}
          addItem={this.addItem}
          saveWaterMaintenence={this.saveWaterMaintenence}
          onCloseModal={this.closeEditor}
          openWaterMaintenence={this.openWaterMaintenenceEditor}
          allItems={this.state.allItems}
          allMaintenenceItems={this.state.allMaintenence}
        />
        <WaterMaintenenceEditor
          onOpenModal={this.state.openWaterMaintenenceEditor}
          saveWaterMaintenence={this.saveWaterMaintenence}
          allFlatInfo={this.state.allMaintenence}
          waterMaintenenceItems={this.state.waterMaintenenceItems}
          onCloseModal={this.closeWaterEditor}
        />
        <ReactModal
          onOpenModal={this.state.openModal}
          onCloseModal={this.closeModal}
          modalHeader={this.state.modalHeader}
          modalBody={this.state.modalBody}
          modalResponseYes={this.state.modalResponseYes}
          modalResponseNo={this.modalResponseNo}
          modalYesText={this.state.modalYesText}
          modalNoText={this.state.modalNoText}
        />
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
              onClick={this.fetchMaintenence}
            >
              <span style={{ position: "relative", top: -5 }}>Fetch</span>
            </button>
          </center>
        </div>
        <div>{this.getAllMaintenenceInfo({ Id: 0, Flat: { Name: "" } })}</div>
        <center>
          <div className="form-group row" center>
            {this.state.allFlats
              .filter(function(flat) {
                return flat.Id && flat.Id != 0;
              })
              .map(flatInfo => this.getAllMaintenenceInfo(flatInfo))}
          </div>
        </center>
      </div>
    );
  }
}

export default Maintenence;
