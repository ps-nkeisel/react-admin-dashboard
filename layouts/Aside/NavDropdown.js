import React, { useState } from "react";
import { useRouter } from "next/router";
import NavItem from "./AsideLink";
import PropTypes from "prop-types";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-solid-svg-icons";

const AsideItemDropdown = ({ name, Icon, subItems }) => {
  const router = useRouter();
  const isOpened = subItems.some(({ url }) => router.pathname === url);

  const [opened, setOpened] = useState(isOpened);

  let itemClassName = classnames("nav-item with-sub", { show: opened });

  return (
    <li className={itemClassName} key={name}>
      <a className="nav-link" onClick={() => setOpened(!opened)}>
        <FontAwesomeIcon icon={Icon} />
        <span>{name}</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </a>
      <ul>
        {subItems.map(({ name, Icon, url, onClick }, index) => (
          <NavItem onClick={onClick} name={name} Icon={Icon} url={url} key={index} />
        ))}
      </ul>
    </li>
  );
};

AsideItemDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  // Icon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
  //   .isRequired,
  subItems: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string
      // Icon: PropTypes.oneOfType([
      //   PropTypes.arrayOf(PropTypes.node),
      //   PropTypes.node
      // ]).isRequired
    })
  )
};

export default AsideItemDropdown;
