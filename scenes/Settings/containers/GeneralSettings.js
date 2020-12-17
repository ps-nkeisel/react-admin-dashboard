import React from "react";
import ModerationSwitches from "../components/GeneralSettings/ModerationSwitches";
import BlockWordSwitches from "../components/GeneralSettings/BlockWordSwitches";
import NotificationSwitches from "../components/GeneralSettings/NotificationSwitches";

const GeneralSettings = () => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <ModerationSwitches />
      </div>
      <div className="col-sm-12">
        <BlockWordSwitches />
      </div>
      <div className="col-sm-12">
        <NotificationSwitches />
      </div>
    </div>
  );
};

export default GeneralSettings;
