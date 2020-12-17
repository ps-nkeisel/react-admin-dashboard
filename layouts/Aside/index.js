import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Menu, X } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faAnalytics,
  faBookOpen,
  faBullhorn,
  faCog,
  faEye,
  faComments,
  faSmile,
  faBooks,
  faHeadset,
  faClock,
  faDollarSign,
  faCode,
  faComment,
  faGlobe,
  faCalendarAlt,
} from "@fortawesome/pro-solid-svg-icons";

import AsideItemDropdown from "./NavDropdown";
import AsideLink from "./AsideLink";
import SiteListDropdown from "@/components/SiteListDropdown";
import { loadSmallChat } from "@/components/SmallChat";

import { updateHost } from "@/services/actions/filter";

const dashboardMenuItems = [
  { name: "Sites List", Icon: faList, url: "/" },
  { name: "Realtime", Icon: faClock, url: "/realtime" },
  { name: "Reports", Icon: faBookOpen, url: "/reports" },
  {
    name: "Revenue",
    Icon: faDollarSign,
    url: "/revenue",
    items: [
      { name: "Overview", Icon: faEye, url: "/revenue?by=domain&host=&tab=0" },
      { name: "By Domain", Icon: faGlobe, url: "/revenue?by=domain" },
      { name: "By Date", Icon: faCalendarAlt, url: "/revenue?by=date" },
    ],
  },
  { name: "Moderation", Icon: faBullhorn, url: "/moderation" },
  { name: "Settings", Icon: faCog, url: "/settings" },
];

const widgetsLinks = [
  {
    name: "Analytics",
    Icon: faAnalytics,
    items: [
      { name: "Overview", Icon: faEye, url: "/analytics/overview" },
      { name: "Comments", Icon: faComments, url: "/analytics/comments" },
      { name: "Emotes", Icon: faSmile, url: "/analytics/emotes" },
      // {
      //   name: "Heart (Likes)",
      //   Icon: faHeart,
      //   url: "/analytics/recommendations"
      // }
    ],
  },
  //   {
  //     name: "Comments",
  //     Icon: MessageCircle,
  //     items: [
  //       { name: "Overview", Icon: Tag, url: "/comments-overview" },
  //       { name: "Top Articles", Icon: Tag, url: "/comments-top-articles" },
  //       {
  //         name: "Technology Analytics",
  //         Icon: Tag,
  //         url: "/comments-technology-analytics"
  //       },
  //       { name: "Geo Analytics", Icon: Tag, url: "/comments-geo-analytics" }
  //     ]
  //   },
  //   {
  //     name: "Emotes",
  //     Icon: Smile,
  //     items: [
  //       { name: "Overview", Icon: Tag, url: "/comments-overview" },
  //       { name: "Top Articles", Icon: Tag, url: "/comments-top-articles" },
  //       {
  //         name: "Technology Analytics",
  //         Icon: Tag,
  //         url: "/comments-technology-analytics"
  //       },
  //       { name: "Geo Analytics", Icon: Tag, url: "/comments-geo-analytics" }
  //     ]
  //   },
  //   {
  //     name: "Powerbar",
  //     Icon: Share2,
  //     items: [
  //       { name: "Overview", Icon: Tag, url: "/comments-overview" },
  //       { name: "Top Articles", Icon: Tag, url: "/comments-top-articles" },
  //       {
  //         name: "Technology Analytics",
  //         Icon: Tag,
  //         url: "/comments-technology-analytics"
  //       },
  //       { name: "Geo Analytics", Icon: Tag, url: "/comments-geo-analytics" }
  //     ]
  //   }
];

const Aside = () => {
  const [minimized, setMinimized] = useState(true);
  const [asideHovered, setAsideHovered] = useState(false);
  const [dashboardItems, setDashboardItems] = useState(dashboardMenuItems);
  const sites = useSelector(({ session }) => session.sites);
  const host = useSelector(({ filter }) => filter.host);
  const dispatch = useDispatch();
  const router = useRouter();

  const clearHost = () => {
    dispatch(updateHost(""));
  };

  const renderDashboardMenuItems = (items) =>
    items.map(({ name, Icon, url, items }, index) => {
      // console.log(items);
      if (items && items.length > 0) {
        if (name === "Revenue") {
          if (sites.length > 0) {
            items[1] = {
              name: "By Domain",
              Icon: faGlobe,
              url: `/revenue?by=domain&host=${host || sites[0]}`,
            };
          }

          items[0].onClick = clearHost;
        }
        return (
          <AsideItemDropdown
            name={name}
            Icon={Icon}
            subItems={items}
            key={index}
          />
        );
      } else {
        return (
          <AsideLink
            name={name}
            Icon={Icon}
            url={url}
            key={index}
          />
        );
      }
    });

  const asideClassName = classNames("aside", "aside-fixed", {
    minimize: minimized,
    maximize: minimized && asideHovered,
  });

  const handleToggleClick = (e) => {
    e.preventDefault();
    setMinimized(!minimized);
  };

  return (
    <aside className={asideClassName}>
      <div className="aside-header">
        <a href="/" className="aside-logo-mini">
          <img src="/static/images/logo-small.svg" alt="Vuukle Logo" />
        </a>
        <a href="/" className="aside-logo">
          <img src="/static/images/logo.svg" alt="Vuukle Logo" />
        </a>
        <a href="" className="aside-menu-link" onClick={handleToggleClick}>
          <Menu />
          <X />
        </a>
      </div>
      <div className="aside-body">
        <div className="d-lg-none">
          <SiteListDropdown excludeAllSites={router.pathname === "/settings"} />
        </div>
        <ul className="nav nav-aside">
          {renderDashboardMenuItems(dashboardItems)}

          <li className="nav-label mg-t-15 pd-lg-t-2 mg-lg-b-9-f">Widgets</li>
          {renderDashboardMenuItems(widgetsLinks)}

          <li className="nav-label mg-t-15">Help</li>
          <li className="nav-item">
            <a
              href="https://docs.vuukle.com"
              target="_blank"
              className="nav-link"
              rel="nofollow"
            >
              <FontAwesomeIcon icon={faBooks} />
              <span>Documentation</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="mailto:support@vuukle.com" className="nav-link">
              <FontAwesomeIcon icon={faHeadset} />
              <span>Support</span>
            </a>
          </li>
          <AsideLink name="Integration" Icon={faCode} url="/integration" />
          <li className="nav-item">
            <a
              onClick={(e) => {
                e.preventDefault();
                loadSmallChat();
              }}
              className="nav-link smallchat-launcher"
            >
              <FontAwesomeIcon icon={faComment} />
              <span>Chat with us</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
