import React, { Component } from "react";
import Modal from "react-responsive-modal";

class FlatModal extends Component {
  populatePeople = people => {
    let items = [];
    if (people.length) {
      items.push(<option key="-1" value="" />);
    }
    for (let i = 0; i < people.length; i++) {
      items.push(
        <option key={people[i].Id} value={people[i].Id}>
          {people[i].Name}
        </option>
      );
    }
    return items;
  };
  render() {
    return (
      <Modal
        open={this.props.onOpenModal}
        onClose={this.props.onCloseModal}
        center
      >
        <br />
        <br />
        <div className="form-group row">
          <div className="col-sm-5">
            <label>Flat Name</label>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              placeholder="Flat Name"
              value={this.props.flatInfo.Flat.Name}
              onChange={e => this.props.handleFlatNameChange(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5">
            <h4>Owner(s):</h4>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <label>Primary</label>
          </div>
          <div className="col-sm-9">
            <select
              type="text"
              className="form-control"
              value={this.props.flatInfo.PrimaryOwnerId}
              onChange={e => this.props.handlePrimaryOwnerChange(e)}
            >
              {this.populatePeople(this.props.allOwners)}
            </select>
            <br />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <label>Secondary</label>
          </div>
          <div className="col-sm-9">
            <select
              type="text"
              className="form-control"
              placeholder="Owner Name"
              value={this.props.flatInfo.SecondaryOwnerId}
              onChange={e => this.props.handleSecondaryOwnerChange(e)}
            >
              {this.populatePeople(this.props.allOwners)}
            </select>
            <br />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-5">
            <h4>Resident(s):</h4>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <label>Primary</label>
          </div>
          <div className="col-sm-9">
            <select
              type="text"
              className="form-control"
              value={this.props.flatInfo.PrimaryResidentId}
              onChange={e => this.props.handlePrimaryResidentChange(e)}
            >
              {this.populatePeople(this.props.allResidents)}
            </select>
            <br />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <label>Secondary</label>
          </div>
          <div className="col-sm-9">
            <select
              type="text"
              className="form-control"
              value={this.props.flatInfo.SecondaryResidentId}
              onChange={e => this.props.handleSecondaryResidentChange(e)}
            >
              {this.populatePeople(this.props.allResidents)}
            </select>
            <br />
          </div>
        </div>
        <br />
        <div className="form-group row">
          <div className="col-sm-5">
            <div>
              <button
                className="btn btn-danger"
                onClick={this.props.deleteFlatInfo}
                hidden={!this.props.flatInfo.FlatId}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="col-sm-4" />
          <div className="col-sm-3">
            <div style={{ textAlign: "Left" }}>
              <button
                className="btn btn-success"
                onClick={this.props.saveFlatInfo}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default FlatModal;
