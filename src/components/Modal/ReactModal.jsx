import React, { Component } from "react";
import Modal from "react-responsive-modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import { ModalFooter, ModalBody } from "react-bootstrap";

class ReactModal extends Component {
  renderBtn2 = () => {
    if (this.props.modalNoText === "") {
      return;
    } else {
      return (
        <div style={{ visibility: this.btn2Visibility }}>
          <button
            className="btn pull-Left"
            onClick={this.props.modalResponseNo}
          >
            {this.props.modalNoText}
          </button>
        </div>
      );
    }
  };
  render() {
    return (
      <Modal open={this.props.onOpenModal} onClose={this.props.onCloseModal}>
        <ModalHeader>{this.props.modalHeader}</ModalHeader>
        <ModalBody>{this.props.modalBody}</ModalBody>
        <ModalFooter>
          <button
            className="btn btn-success pull-right"
            onClick={this.props.modalResponseYes}
          >
            {this.props.modalYesText}
          </button>
          {this.renderBtn2()}
        </ModalFooter>
      </Modal>
    );
  }
}

export default ReactModal;
