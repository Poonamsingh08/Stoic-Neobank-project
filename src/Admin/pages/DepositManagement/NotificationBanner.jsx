import React from "react";
import "./NotificationBanner.css";

const NotificationBanner = ({ message }) => {
  return (
    <div className="adm-notification">
      {message}
    </div>
  );
};

export default NotificationBanner;
