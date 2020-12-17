import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { Menu, MenuItem, Popover, Position } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnalytics,
  faClock,
  faBullhorn,
  faBookOpen,
  faDollarSign,
  faCog
} from "@fortawesome/pro-solid-svg-icons";

import ErrorSafeImg from "@/components/ErrorSafeImg";

import { updateHost } from "@/services/actions/filter";
import { setLoading } from "@/services/actions/sites";

const SiteItemDropDown = ({ host, onSelect }) => {
  const dispatch = useDispatch();
  const sitesList = useSelector(({ session }) => ({
    sites: session.sites,
    avatars: session.avatars
  }));

  const setHostAndGoToPage = page => {
    dispatch(updateHost(host));
    dispatch(setLoading());
    Router.push(page);
  };

  const menu = (
    <Menu className="tx-color-05 rounded-4">
      <MenuItem
        className="tx-16"
        icon={<FontAwesomeIcon className="mg-t-3" icon={faAnalytics} />}
        text="Analytics"
        onClick={() => setHostAndGoToPage("/analytics/overview")}
      />
      <MenuItem
        className="tx-16"
        icon={<FontAwesomeIcon className="mg-t-3" icon={faClock} />}
        text="Real Time"
        onClick={() => setHostAndGoToPage("/realtime")}
      />
      <MenuItem
        className="tx-16"
        onClick={() => setHostAndGoToPage("/moderation")}
        icon={<FontAwesomeIcon className="mg-t-3" icon={faBullhorn} />}
        text="Moderation"
      />
      <MenuItem
        className="tx-16"
        onClick={() => setHostAndGoToPage("/reports")}
        icon={<FontAwesomeIcon className="mg-t-3" icon={faBookOpen} />}
        text="Reports"
      />
      <MenuItem
        className="tx-16"
        onClick={() => setHostAndGoToPage("/revenue")}
        icon={<FontAwesomeIcon className="mg-t-3" icon={faDollarSign} />}
        text="Revenue"
      />
      <MenuItem
        className="tx-16"
        onClick={() => setHostAndGoToPage("/settings")}
        icon={<FontAwesomeIcon className="mg-t-3" icon={faCog} />}
        text="Site Settings"
      />
    </Menu>
  );

  return (
    <Popover content={menu} position={Position.RIGHT_BOTTOM}>
      <a href="#" onClick={e => e.preventDefault()}>
        <ErrorSafeImg
          src={sitesList.avatars[sitesList.sites.indexOf(host)] || ''}
          alt={host}
          size={32}
          className="d-inline-block valign-middle-f mg-r-10"
          style={{ borderRadius: "100%" }}
        />
        <span>{host}</span>
      </a>
    </Popover>
  );
};

export default SiteItemDropDown;
