import React from "react";
import BlockWords from "../components/AdvancedSettings/BlockWords";
import BlockIPs from "../components/AdvancedSettings/BlockIPs";
import BlockEmails from "../components/AdvancedSettings/BlockEmails";
import WhitelistEmails from "../components/AdvancedSettings/WhitelistEmails";

const AdvancedSettings = () => {
  return (
    <div className="vu-advanced-settings">
      <WhitelistEmails />
      <BlockWords />
      <BlockIPs />
      <BlockEmails />
    </div>
  );
};

export default AdvancedSettings;
