import React, { Component } from "react";
import AppConfig from "../appConfig.json";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import MaintenenceItemModal from "./Modal/MaintenenceItemModal";

class MaintenenceItem extends Component {
  state = {
    open: false,
    maintenenceItems: [],
    maintenenceItem: {}
  };
  openModal = () => {
    this.setState({ maintenenceItem: {}, open: true });
  };
  onModalClose = () => {
    this.setState({ open: false });
  };
  editItem = maintenenceItemId => {
    let allmaintenenceItems = [...this.state.maintenenceItems];
    let maintenenceItemToEdit = {
      ...allmaintenenceItems.filter(x => x.Id == maintenenceItemId)[0]
    };
    this.setState({ maintenenceItem: maintenenceItemToEdit, open: true });
  };
  getHtmlForCards = () => {
    return (
      <Table striped hover style={{ width: 1000, marginLeft: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ height: "750px", overflowY: "auto" }}>
          {this.state.maintenenceItems.map(maintenenceItem => (
            <tr key={maintenenceItem.Id}>
              <td>{maintenenceItem.Name}</td>
              <td>
                <i
                  className="fa fa-pencil fa-lg"
                  onClick={() => this.editItem(maintenenceItem.Id)}
                  aria-hidden="true"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  componentDidMount() {
    this.refreshGrid();
  }
  postInfo = () => {
    fetch(AppConfig.API_URL + "/api/maintenenceItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.maintenenceItem)
    })
      .then(response => response.json())
      .then(data => {
        debugger;
        if (data) {
          toast.error(data);
        } else {
          this.onModalClose();
          debugger;
          toast.success(
            "Item '" +
              this.state.maintenenceItem.Name +
              "' added successfully!!"
          );
          this.setState({ open: false });
          this.refreshGrid();
        }
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  refreshGrid = () => {
    fetch(AppConfig.API_URL + "/api/MaintenenceItem")
      .then(response => response.json())
      .then(data => {
        this.setState({ maintenenceItems: data });
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  updateType = e => {
    var maintenenceItem = { ...this.state.maintenenceItem };
    maintenenceItem.IsWater = e.target.checked;
    this.setState({ maintenenceItem });
  };
  deleteMaintenenceItem = () => {
    debugger;
    fetch(
      AppConfig.API_URL +
        "/api/maintenenceItem/" +
        this.state.maintenenceItem.Id,
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
          "Item '" +
            this.state.maintenenceItem.Name +
            "' deleted successfully!!"
        );
        this.refreshGrid();
      })
      .catch(function(error) {
        toast.error(error.message);
      });
  };
  saveMaintenenceItem = () => {
    this.postInfo();
  };
  handleMaintenenceItemNotesChange = e => {
    var maintenenceItem = { ...this.state.maintenenceItem };
    maintenenceItem.Notes = e.target.value;
    this.setState({ maintenenceItem });
  };
  handleMaintenenceItemNameChange = e => {
    var maintenenceItem = { ...this.state.maintenenceItem };
    maintenenceItem.Name = e.target.value;
    this.setState({ maintenenceItem });
  };
  render() {
    return (
      <div>
        <div className="mb-3 my-lg-0">
          <br />
          <div style={{ textAlign: "right", marginTop: 20 }}>
            <button
              className="btn btn-outline-success my-2 my-sm-0 "
              style={{ marginLeft: -150, position: "fixed" }}
              onClick={this.openModal}
            >
              Add New Item
            </button>
          </div>
          <MaintenenceItemModal
            onOpenModal={this.state.open}
            saveMaintenenceItem={this.saveMaintenenceItem}
            deleteMaintenenceItem={this.deleteMaintenenceItem}
            onCloseModal={this.onModalClose}
            maintenenceItem={this.state.maintenenceItem}
            updateType={this.updateType}
            handleMaintenenceItemNameChange={
              this.handleMaintenenceItemNameChange
            }
            handleMaintenenceItemNotesChange={
              this.handleMaintenenceItemNotesChange
            }
          />
        </div>

        <br />
        <br />
        {this.getHtmlForCards()}
      </div>
    );
  }
}

export default MaintenenceItem;
