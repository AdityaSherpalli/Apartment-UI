import React from "react";
import Notifications, { notify } from "react-notify-toast";

function ShowSuccessMessage(message) {
  notify.show(message, "success", 10000, "red");
}

export default ShowSuccessMessage;
