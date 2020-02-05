import React, { Component } from "react";
import Modal from "react-responsive-modal";

class FlatModal extends Component {
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
            <label>Person Name</label>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              placeholder="Person Name"
              value={this.props.personInfo.Name}
              onChange={e => this.props.handlePersonNameChange(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5">
            <label>Person Type</label>
          </div>
          <div className="col-sm-7">
            <select
              value={this.props.personInfo.PersonType}
              onChange={this.props.handlePersonTypeChange}
            >
              <option value="0">Owner</option>
              <option value="1">Resident</option>
              <option value="2">Watchman</option>
              <option value="3">Electrician</option>
              <option value="4">Plumber</option>
              <option value="5">Others</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5">
            <label>Phone Number</label>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={this.props.personInfo.PhoneNumber}
              onChange={e => this.props.handlePersonPhoneNumberChange(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5">
            <div>
              <button
                className="btn btn-danger"
                onClick={this.props.deletePersonInfo}
                hidden={!this.props.personInfo.Id}
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
                onClick={this.props.savePersonInfo}
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
