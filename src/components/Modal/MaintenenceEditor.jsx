import React, { Component } from "react";
import Modal from "react-responsive-modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import { ModalFooter, ModalBody } from "react-bootstrap";
import { toast } from "react-toastify";
import TypeAhead from "../TypeAhead";
import "./index.css";
const Months = new Array();
Months[0] = "January";
Months[1] = "February";
Months[2] = "March";
Months[3] = "April";
Months[4] = "May";
Months[5] = "June";
Months[6] = "July";
Months[7] = "August";
Months[8] = "September";
Months[9] = "October";
Months[10] = "November";
Months[11] = "December";
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
    items = items.sort();
    for (let i = this.props.allItems.length - 1; i >= 0; i--) {
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
  handleItemChange = (e, index) => {
    this.props.handleItemChange(e, index);
  };
  renderGridView = () => {
    if (!this.props.onOpenModal) return;
    if (
      this.props.allMaintenenceItems.MaintenenceItems &&
      this.props.allMaintenenceItems.MaintenenceItems.length === 0
    ) {
      this.props.addItem();
    }
    return this.props.allMaintenenceItems.MaintenenceItems.map(
      (MaintenenceItem, index) => (
        <div className="form-group row" style={{ top: 10 }} key={index}>
          <div className="col-sm-4">
            <select
              type="text"
              className="form-control"
              value={MaintenenceItem.MaintenenceItem.Id}
              onChange={e => this.handleItemChange(e, index)}
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
            {this.renderNotesSection(MaintenenceItem, index)}
          </div>
          <br />
        </div>
      )
    );
  };
  renderNotesSection = (MaintenenceItem, index) => {
    var placeholder = "Notes";
    var test = function() {
      return placeholder;
    };
    test();
    if (
      !this.props.allMaintenenceItems.MaintenenceItems[index].MaintenenceItem
        .IsWater ||
      this.props.allMaintenenceItems.MaintenenceItems[index].Id == -1
    ) {
      return (
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={MaintenenceItem.Notes}
          onChange={e => this.props.handleNotesChange(e, index)}
        />
      );
    }
    if (
      this.props.allMaintenenceItems.MaintenenceItems[index] &&
      this.props.allMaintenenceItems.MaintenenceItems[index].TextBoxVisibility
    ) {
      return (
        <input
          type="text"
          id={index}
          ref={input => {
            if (input) {
              input.focus();
            }
          }}
          className="form-control"
          placeholder={placeholder}
          value={this.props.allMaintenenceItems.MaintenenceItems[index].Notes}
          onChange={e => {
            // if (
            //   this.props.allMaintenenceItems.MaintenenceItems[index].Notes !=
            //   e.target.value
            // ) {
            var selectedMonthsCount = this.props.allMaintenenceItems
              .MaintenenceItems[index].Notes;
            if (!selectedMonthsCount && selectedMonthsCount != 0)
              selectedMonthsCount = 1;
            if (selectedMonthsCount != e.target.value) {
              selectedMonthsCount = parseInt(e.target.value);
            }
            var months = this.getMonthsBasedOnCount(selectedMonthsCount);
            this.props.handleMonthSelectionChanged(months, index);
            // }
            this.props.handleNotesChange(e, index);
          }}
          onBlurCapture={() => {
            this.props.handleTextBoxVisibility(false, index);
          }}
        />
      );
    }
    return (
      <div className="row">
        <div className="addedItemsParent col-sm-10">
          {this.renderSelectedMonths(index)}
        </div>
        <div className="row" style={{ alignContent: "center" }}>
          <i
            className="fa fa-pencil fa-lg col-sm-2"
            onClick={() => {
              this.props.handleTextBoxVisibility(true, index);
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  };
  getMonthsBasedOnCount = selectedMonthsCount => {
    if (selectedMonthsCount == 0) return [];
    var lastMonthToConsider = "";
    if (typeof this.props.allMaintenenceItems.Maintenence.Period === "string") {
      var date = this.props.allMaintenenceItems.Maintenence.Period;
      lastMonthToConsider = new Date(
        date.substring(0, 4),
        parseInt(date.substring(3)) - 1,
        5
      );
    } else {
      lastMonthToConsider = new Date(
        this.props.allMaintenenceItems.Maintenence.Period.getFullYear() +
          "-" +
          (this.props.allMaintenenceItems.Maintenence.Period.getMonth() + 1) +
          "-05"
      );
    }

    var monthsToConsider = [];
    for (let counter = selectedMonthsCount - 1; counter > 0; counter--) {
      var date = new Date(lastMonthToConsider);
      date.setMonth(date.getMonth() - counter);
      monthsToConsider.push(date);
    }
    monthsToConsider.push(lastMonthToConsider);

    return monthsToConsider;
  };
  renderSelectedMonths = index => {
    var months = this.props.allMaintenenceItems.MaintenenceItems[index]
      .SelectedMonths;
    if (!months) {
      var selectedMonthsCount = this.props.allMaintenenceItems.MaintenenceItems[
        index
      ].Notes;
      months = this.getMonthsBasedOnCount(selectedMonthsCount);
      this.props.handleMonthSelectionChanged(months, index);
    }
    return months.map(month => {
      return (
        <div
          className="addedItems"
          onClick={() => {
            this.removeMonthAndUpdate(index, Months[month.getMonth()]);
          }}
        >
          <span className="tooltiptext">
            {Months[month.getMonth()].substring(0, 3) +
              "'" +
              (month.getYear() - 100)}
          </span>
          {Months[month.getMonth()].substring(0, 3)}
        </div>
      );
    });
  };
  removeMonthAndUpdate(index, monthToRemove) {
    var allMonths = this.props.allMaintenenceItems.MaintenenceItems[index]
      .SelectedMonths;
    var updatedMonths = allMonths.filter(
      month => Months[month.getMonth()] != monthToRemove
    );
    this.props.handleMonthSelectionChanged(updatedMonths, index);
  }
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
              maxHeight: 750
            }}
          >
            {this.renderGridView()}
          </div>
          <br />
          <button className="btn pull-right" onClick={this.props.addItem}>
            Add
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
