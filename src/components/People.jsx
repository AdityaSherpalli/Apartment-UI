import React, { Component } from "react";
import PeopleModal from "./Modal/PeopleModal";
import AppConfig from "../appConfig.json";
import "font-awesome/css/font-awesome.min.css";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";

class People extends Component {
  state = {
    open: false,
    searchText: "",
    personInformation: {},
    peopleInfo: []
  };

  postPersonInfo = () => {
    fetch(AppConfig.API_URL + "/api/People", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.personInformation)
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          toast.error(data);
        } else {
          this.onModalClose();
          if (this.state.personInformation.Id)
            toast.success(
              "Person '" +
                this.state.personInformation.Name +
                "' updated successfully!!"
            );
          else
            toast.success(
              "Person '" +
                this.state.personInformation.Name +
                "' added successfully!!"
            );
          this.refreshGrid();
        }
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  refreshGrid = () => {
    fetch(AppConfig.API_URL + "/api/People")
      .then(response => response.json())
      .then(data => {
        this.setState({ peopleInfo: data });
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  componentDidMount() {
    return this.refreshGrid();
  }
  savePersonInfo = () => {
    this.postPersonInfo();
  };
  deletePersonInfo = () => {
    this.postDeletePersonInfo();
  };
  postDeletePersonInfo = () => {
    fetch(
      AppConfig.API_URL + "/api/People/" + this.state.personInformation.Id,
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
          "Person '" +
            this.state.personInformation.Name +
            "' deleted successfully!!"
        );
        this.refreshGrid();
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  render() {
    return (
      <div>
        <div className="mb-3 my-lg-0">
          <br />
          <div style={{ textAlign: "right", marginTop: 0 }}>
            <button
              className="btn btn-outline-success my-2 my-sm-0 "
              style={{ marginLeft: -150, position: "fixed" }}
              onClick={this.openModal}
            >
              Add New Person
            </button>
          </div>
          <PeopleModal
            onOpenModal={this.state.open}
            savePersonInfo={this.savePersonInfo}
            deletePersonInfo={this.deletePersonInfo}
            onCloseModal={this.onModalClose}
            handlePersonNameChange={this.handlePersonNameChange}
            handlePersonTypeChange={this.handlePersonTypeChange}
            handlePersonPhoneNumberChange={this.handlePersonPhoneNumberChange}
            handlePersonEmailChange={this.handlePersonEmailChange}
            personInfo={this.state.personInformation}
          />
        </div>

        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={this.state.searchText}
          onChange={e => this.SearchContent(e)}
          style={{
            width: 500,
            marginLeft: 20
          }}
        />
        <br />
        <br />
        <div style={{ height: "770px", overflowY: "auto" }}>
          {this.getHtmlForCards()}
        </div>
      </div>
    );
  }
  handlePersonNameChange = e => {
    var { personInformation } = { ...this.state };
    personInformation.Name = e.target.value;
    this.setState({ personInformation });
  };
  handlePersonTypeChange = e => {
    var { personInformation } = { ...this.state };
    personInformation.PersonType = parseInt(e.target.value);
    this.setState({ personInformation });
  };
  SearchContent = e => {
    var { searchText } = { ...this.state };
    searchText = e.target.value;
    this.setState({ searchText });
  };
  handlePersonPhoneNumberChange = e => {
    var { personInformation } = { ...this.state };
    personInformation.PhoneNumber = e.target.value;
    this.setState({ personInformation });
  };
  handlePersonEmailChange = e => {
    var { personInformation } = { ...this.state };
    personInformation.Email = e.target.value;
    this.setState({ personInformation });
  };
  openModal = () => {
    this.setState({ personInformation: {} });
    this.setState({ open: true });
  };
  onModalClose = () => {
    this.setState({ open: false });
  };
  editItem = personId => {
    let allPeople = [...this.state.peopleInfo];
    let personToEdit = { ...allPeople.filter(x => x.Id == personId)[0] };
    this.setState({ personInformation: personToEdit, open: true });
  };
  getTypeString = intType => {
    switch (intType) {
      case 0:
        return "Owner";
      case 1:
        return "Resident";
      case 2:
        return "Watchman";
      case 3:
        return "Electrician";
      case 4:
        return "Plumber";
      case 5:
        return "Others";
    }
  };
  getHtmlForCards = () => {
    return (
      <Table striped hover style={{ width: 1000, marginLeft: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.peopleInfo.map(personInfo => (
            <tr key={personInfo.Id}>
              <td>{personInfo.Name}</td>
              <td>{this.getTypeString(personInfo.PersonType)}</td>
              <td>{personInfo.PhoneNumber}</td>
              <td>{personInfo.Email}</td>
              <td>
                <i
                  className="fa fa-pencil fa-lg"
                  onClick={() => this.editItem(personInfo.Id)}
                  aria-hidden="true"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
}

export default People;
