import React from "react";

const PermissionErrorScene = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: "30px",
        backgroundColor: "#F5F7FA"
      }}
    >
      <div className="paid-block">
        <div className="paid-block__info">
          <img src="/static/images/snap.svg" alt="Snap feature" />
          <p>{message}</p>
        </div>
        <div className="paid-block__contact">
          <p>
            If you are interested please contact{" "}
            <a href="mailto:support@vuukle.com">support@vuukle.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PermissionErrorScene;
