import React from "react";
import Link from "next/link";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDollarSign,
  faCode
} from "@fortawesome/pro-solid-svg-icons";

import HelpButtons from "@/components/HelpButtons";
import ProfileDropdown from "@/components/ProfileDropdown";

const HomeHeader = () => {
  const sites = useSelector(({ session }) => session.sites);

  return (
    <div className="content-header content-header__no-navbar">
      <a href="/" className="small-logo">
        <img
          src="/static/images/logo.svg"
          alt="Vuukle Logo"
          className="w-100"
        />
      </a>
      <nav className="nav">
        <Link href="/integration" prefetch={false}>
          <a className="nav-link tx-center align-self-center btn-sm btn-xs btn-ui-05 tx-medium">
            <FontAwesomeIcon
              className="mg-lg-r-10 ht-auto fa-w-17"
              icon={faCode}
            ></FontAwesomeIcon>
            <span>Integration</span>
          </a>
        </Link>
        <Link href={sites ? `/realtime?host=${sites[0]}` : '/realtime'} prefetch={false}>
          <a className="nav-link tx-center align-self-center btn-sm btn-xs btn-ui-05 tx-medium">
            <FontAwesomeIcon
              className="mg-lg-r-10 ht-auto fa-w-17"
              icon={faClock}
            ></FontAwesomeIcon>
            <span>Realtime</span>
          </a>
        </Link>
        <Link href="/revenue" prefetch={false}>
          <a className="nav-link tx-center mr-1 align-self-center btn-sm btn-xs btn-ui-05 tx-medium">
            <FontAwesomeIcon
              className="mg-lg-r-10 ht-auto fa-w-10"
              icon={faDollarSign}
            ></FontAwesomeIcon>
            <span>Revenue</span>
          </a>
        </Link>
        <HelpButtons />
        <ProfileDropdown />
      </nav>
    </div>
  );
};

export default HomeHeader;
