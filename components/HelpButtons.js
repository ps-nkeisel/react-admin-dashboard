import React from "react";
import Link from "next/link";
import { 
  Popover,
  Position
 } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/pro-solid-svg-icons";

const HelpButtons = () => {
  <>
    {/* <a target="_blank" href="https://docs.vuukle.com/" className="tx-center mr-1 align-self-center btn-sm btn-sm--square btn-xs btn-ui-05 tx-medium pos-relative">
      <FontAwesomeIcon
        className="ht-auto fa-w-10"
        icon={faQuestion}
      ></FontAwesomeIcon>
    </a> */}
    
    {/* <Link href="#">
      <a className="tx-center align-self-center btn-sm btn-sm--square btn-xs btn-ui-05 tx-medium pos-relative mr-3">
        <FontAwesomeIcon
          className="ht-auto fa-w-10"
          icon={faBell}
        ></FontAwesomeIcon>
        <span className="notif-number tx-white tx-10">2</span>
      </a>
    </Link> */}
  </>

const dropdownMenu = (
  <div className="vu-notifications-pop">
    <h4 className="vu-notifications-list__title">Latest Changes</h4>
    {/* <ul className="vu-notifications-list">
      <li className="vu-notifications-list__item"> Please confirm your email address</li>
      <li className="vu-notifications-list__item">Please complete your billing details</li>
      <li className="vu-notifications-list__item">You need to complete the form</li>
    </ul> */}
  </div>
);

return (
  <>
      <Link href="#">
        <a className="vu-notifications-wrapper tx-center align-self-center btn-sm--square btn-xs btn-ui-05 tx-medium pos-relative mr-3">
          <Popover
            content={dropdownMenu}
            position={Position.BOTTOM_RIGHT}
            minimal={true}
            border={0}
          >
            <span className="vu-notifications-pop__placeholder"></span>
          </Popover>
          <FontAwesomeIcon
            className="ht-auto fa-w-10"
            icon={faBell}
          ></FontAwesomeIcon>
         
          {/* <span className="notif-number tx-white tx-10">2</span> */}
        </a>
      </Link>
    </>
);
};

export default HelpButtons;
