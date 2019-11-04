import React, { Component } from "react";
import Modal from "react-responsive-modal";

class MaintenenceItemModal extends Component {
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
            <label>Item Name</label>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              placeholder="Flat Name"
              value={this.props.maintenenceItem.Name}
              onChange={e => this.props.handleMaintenenceItemNameChange(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-7">
            <label>Is Water:</label>
          </div>
          <div class="checkbox">
            <label>
              <input
                type="checkbox"
                onChange={this.props.updateType}
                checked={this.props.maintenenceItem.IsWater}
                disabled={this.props.checkboxEnabled}
              />
            </label>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5">
            <div>
              <button
                className="btn btn-danger"
                onClick={this.props.deleteMaintenenceItem}
                hidden={!this.props.maintenenceItem.Id}
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
                onClick={this.props.saveMaintenenceItem}
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

export default MaintenenceItemModal;
