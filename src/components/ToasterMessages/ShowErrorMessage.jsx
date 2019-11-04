import React from "react";
import Notifications, { notify } from "react-notify-toast";

function ShowErrorMessage(message) {
  notify.show(message, "error");
}

export default ShowErrorMessage;
