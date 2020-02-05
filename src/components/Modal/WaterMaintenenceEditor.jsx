import React, { Component } from "react";
import Modal from "react-responsive-modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import { ModalFooter, ModalBody } from "react-bootstrap";
import { toast } from "react-toastify";

class WaterMaintenenceEditor extends Component {
  state = {};
  render() {
    return (
      <Modal
        open={this.props.onOpenModal}
        onClose={this.props.onCloseModal}
        center
      >
        <ModalHeader>Water Maintenence</ModalHeader>
        <ModalBody>{/* {this.props.allFlatInfo.} */}</ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              className="btn btn-success"
              onClick={this.props.onCloseModal}
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

export default WaterMaintenenceEditor;
