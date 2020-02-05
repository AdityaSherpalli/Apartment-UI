import React, { Component } from "react";
import Modal from "react-responsive-modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import { ModalFooter, ModalBody } from "react-bootstrap";
import { toast } from "react-toastify";

class MaintenenceEditor extends Component {
  state = {
    maintenenceItems: [
      {
        IsCreated: false,
        WaterMaintenences: [],
        MaintenenceItems: []
      }
    ]
  };
  populateItems = () => {
    let items = [];
    if (this.props.allItems.length) {
      items.push(<option key="-1" value="" />);
    }
    for (let i = 0; i < this.props.allItems.length; i++) {
      items.push(
        <option
          key={this.props.allItems[i].Id}
          value={this.props.allItems[i].Id}
        >
          {this.props.allItems[i].Name}
        </option>
      );
    }
    return items;
  };
  renderGridView = () => {
    if (!this.props.onOpenModal) return;
    if (this.props.allMaintenenceItems.MaintenenceItems.length === 0) {
      this.props.addItem();
    }
    return this.props.allMaintenenceItems.MaintenenceItems.map(
      (MaintenenceItem, index) => (
        <div
          className="form-group row"
          // sdt={true}
          style={{ top: 10 }}
          key={index}
        >
          <div className="col-sm-4">
            <select
              type="text"
              className="form-control"
              value={MaintenenceItem.Id}
              onChange={e => this.props.handleItemChange(e, index)}
            >
              {this.populateItems()}
            </select>
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Price of item"
              value={MaintenenceItem.Amount}
              onChange={e => this.props.handlePriceChange(e, index)}
            />
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Notes(if any)"
              value={MaintenenceItem.Notes}
              onChange={e => this.props.handleNotesChange(e, index)}
            />
          </div>
          <br />
        </div>
      )
    );
  };

  render() {
    return (
      <Modal
        open={this.props.onOpenModal}
        onClose={this.props.onCloseModal}
        center
      >
        <ModalHeader>{this.props.maintenencePeriod}</ModalHeader>
        <ModalBody>
          <div
            style={{
              maxHeight: 750,
              overflowY: "auto",
              overflowX: "hidden"
            }}
          >
            {this.renderGridView()}
          </div>
          <br />
          <button className="btn pull-right" onClick={this.props.addItem}>
            Add
          </button>
          <button
            className="btn pull-left"
            onClick={this.props.openWaterMaintenence}
          >
            Add Water Readings
          </button>
          <br />
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              className="btn btn-success"
              onClick={this.props.saveWaterMaintenence}
            >
              Save
            </button>
          </div>
          <div className="pull-left">
            <button className="btn" onClick={this.props.onCloseModal}>
              Cancel
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default MaintenenceEditor;
