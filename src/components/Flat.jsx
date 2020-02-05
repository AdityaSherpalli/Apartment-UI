import React, { Component } from "react";
import FlatModal from "./Modal/FlatModal";
import AppConfig from "../appConfig.json";
import "font-awesome/css/font-awesome.min.css";
import { toast } from "react-toastify";

class Flat extends Component {
  state = {
    open: false,
    flatInformation: {
      Flat: {},
      PrimaryOwner: {},
      SecondaryOwner: {},
      PrimaryResident: {},
      SecondaryResident: {}
    },
    flatsInfo: [],
    allOwners: [],
    allResidents: []
  };
  getPersonName = personObj => {
    if (personObj) {
      return personObj.Name;
    }
    return null;
  };
  getFlatInfoToPost = () => {
    var {
      Flat,
      Id,
      PrimaryOwnerId,
      SecondaryOwnerId,
      PrimaryResidentId,
      SecondaryResidentId
    } = { ...this.state.flatInformation };
    return {
      Flat,
      Id,
      PrimaryOwnerId,
      SecondaryOwnerId,
      PrimaryResidentId,
      SecondaryResidentId
    };
  };
  postFlatInfo = () => {
    fetch(AppConfig.API_URL + "/api/FlatMember", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.getFlatInfoToPost())
    })
      .then(data => {
        if (!data.ok) {
          toast.error(data.statusText);
        } else {
          this.onModalClose();
          var addUpdateText =
            this.state.flatInformation.FlatId ||
            this.state.flatInformation.FlatId == 0
              ? "updated"
              : "added";
          toast.success(
            "Flat '" +
              this.state.flatInformation.Flat.Name +
              "' " +
              addUpdateText +
              " successfully!!"
          );
          this.refreshGrid();
        }
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  refreshGrid = () => {
    this.loadPeople();
    fetch(AppConfig.API_URL + "/api/FlatMember")
      .then(response => response.json())
      .then(data => {
        this.setState({ flatsInfo: data });
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  postDeleteFlatInfo = () => {
    fetch(
      AppConfig.API_URL + "/api/FlatMember/" + this.state.flatInformation.Id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(data => {
        this.onModalClose();
        toast.success(
          "Flat '" +
            this.state.flatInformation.Flat.Name +
            "' deleted successfully!!"
        );
        this.refreshGrid();
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  handlePrimaryOwnerChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.PrimaryOwner.Id = e.target.value;
    flatInformation.PrimaryOwnerId = e.target.value;
    this.setState({ flatInformation });
  };
  handleSecondaryOwnerChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.SecondaryOwner.Id = e.target.value;
    flatInformation.SecondaryOwnerId = e.target.value;
    this.setState({ flatInformation });
  };
  handlePrimaryResidentChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.PrimaryResident.Id = e.target.value;
    flatInformation.PrimaryResidentId = e.target.value;
    this.setState({ flatInformation });
  };
  handleSecondaryResidentChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.SecondaryResident.Id = e.target.value;
    flatInformation.SecondaryResidentId = e.target.value;
    this.setState({ flatInformation });
  };
  componentDidMount() {
    return this.refreshGrid();
  }
  saveFlatInfo = () => {
    this.postFlatInfo();
  };
  deleteFlatInfo = () => {
    this.postDeleteFlatInfo();
  };
  render() {
    return (
      <div>
        <div className="mb-3 my-lg-0">
          <br />
          <div style={{ textAlign: "right" }}>
            <button
              className="btn btn-outline-success my-2 my-sm-0 "
              style={{ marginLeft: -150, position: "fixed" }}
              onClick={this.openModal}
            >
              Add New Flat
            </button>
          </div>
          <FlatModal
            onOpenModal={this.state.open}
            saveFlatInfo={this.saveFlatInfo}
            deleteFlatInfo={this.deleteFlatInfo}
            onCloseModal={this.onModalClose}
            allOwners={this.state.allOwners}
            allResidents={this.state.allResidents}
            handleFlatNameChange={this.handleFlatNameChange}
            handlePrimaryOwnerChange={this.handlePrimaryOwnerChange}
            handleSecondaryOwnerChange={this.handleSecondaryOwnerChange}
            handlePrimaryResidentChange={this.handlePrimaryResidentChange}
            handleSecondaryResidentChange={this.handleSecondaryResidentChange}
            flatInfo={this.state.flatInformation}
          />
        </div>
        <div style={{ marginTop: 100, height: "755px", overflowY: "auto" }}>
          {this.getHtmlForCards()}
        </div>
      </div>
    );
  }
  handleOwnerNumberChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.OwnerPhoneNumber = e.target.value;
    this.setState({ flatInformation });
  };
  handleResidentNumberChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.residentNumber = e.target.value;
    this.setState({ flatInformation });
  };
  handleOwnerNameChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.OwnerName = e.target.value;
    this.setState({ flatInformation });
  };
  handleResidentNameChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.ResidentName = e.target.value;
    this.setState({ flatInformation });
  };
  handleOwnerResidentCheckboxChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.IsOwnerResident = e.target.checked;
    flatInformation.ResidentName = "";
    flatInformation.ResidentPhoneNumber = "";
    this.setState({ flatInformation });
  };
  handleFlatNameChange = e => {
    var { flatInformation } = { ...this.state };
    flatInformation.Flat.Name = e.target.value;
    this.setState({ flatInformation });
  };
  loadPeople = () => {
    var url = AppConfig.API_URL + "/api/People?personType=";
    var owners = 0;
    var residents = 1;
    fetch(url + owners)
      .then(response => response.json())
      .then(data => {
        this.setState({ allOwners: data });
        fetch(url + residents)
          .then(response1 => response1.json())
          .then(data1 => {
            var allResidents = this.state.allOwners.concat(data1);
            this.setState({ allResidents });
          });
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  openModal = () => {
    this.setState({
      flatInformation: {
        Flat: {},
        PrimaryOwner: {},
        SecondaryOwner: {},
        PrimaryResident: {},
        SecondaryResident: {}
      }
    });
    this.setState({ open: true });
  };
  onModalClose = () => {
    this.setState({ open: false });
  };
  editItem = flatId => {
    let allFlats = [...this.state.flatsInfo];
    let flatToEdit = { ...allFlats.filter(x => x.Id == flatId)[0] };
    this.setState({ flatInformation: flatToEdit, open: true });
  };
  getHtmlForCards = () => {
    return this.state.flatsInfo.map(flatInfo => (
      <div
        key={flatInfo.Flat.Id}
        className="card"
        style={{
          margin: 20,
          width: 300,
          height: 300,
          display: "inline-block",
          boxShadow: "0 2px 5px 0 rgba(0,0,0,.50), 0 2px 10px 0 rgba(0,0,0,.12)"
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
          {flatInfo.Flat.Name}
        </div>
        <div className="card-body">
          Owner Name:
          <br />
          <p className="text-success" style={{ display: "inline" }}>
            {this.getPersonName(flatInfo.PrimaryOwner)}
          </p>
          <br />
          {this.getResidentInfo(flatInfo)}
        </div>
      </div>
    ));
  };
  getResidentInfo = flatInfo => {
    {
      return (
        <div>
          <br />
          Resident Name:
          <br />
          <p className="text-success" style={{ display: "inline" }}>
            {this.getPersonName(flatInfo.PrimaryResident)}
          </p>
        </div>
      );
    }
  };
}

export default Flat;
