import React from "react";

import OnlineUsersContainer from "../components/OnlineUsersContainer";
import DevicesContainer from "../components/DevicesContainer";
import TimeContainer from "../components/TimeContainer";

const RealtimeTopBar = () => (
  <>
    <div className="d-flex flex-wrap justify-content-between justify-content-lg-start align-items-start mb-4">
      <OnlineUsersContainer />
      <DevicesContainer />
      <TimeContainer />
    </div>
  </>
);

export default RealtimeTopBar;
