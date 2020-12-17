import React from "react";

import RealtimeHeader from "./layouts/header";
import RealtimeTopBar from "./layouts/topbar";
import RealtimeBody from "./layouts/body";
import RealtimeLeftBar from "./layouts/leftbar";
import RealtimeRightBar from "./layouts/rightbar";

import "./styles/index.scss";

const RealtimeScene = () => (
  <>
    <RealtimeHeader />
    <div className="pd-lg-x-30 pd-x-15 pd-t-30 pd-b-30 bg-ui-06">
      <RealtimeTopBar />
      <div className="d-flex flex-column flex-lg-row">
        <div className="p-0  order-2 order-lg-1 realtime-sidebar leftbar">
          <RealtimeLeftBar />
        </div>
        <div className="realtime-body order-1 order-lg-2 mb-4">
          <RealtimeBody />
        </div>
        <div className="p-0 order-3 realtime-sidebar rightbar">
          <RealtimeRightBar />
        </div>
      </div>
    </div>
  </>
);

export default RealtimeScene;
