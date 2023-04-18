import { toast } from "react-toastify";

// Configuring toastify in this app to show toast notifications
export const showNotification = (message, type) => {
  toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
