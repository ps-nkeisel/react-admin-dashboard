import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AsideLink = ({ Icon, name, url, className = "", onClick = undefined }) => {
  const router = useRouter();

  const itemClassname = classNames("nav-item", className, {
    active: router.pathname === url
  });

  return (
    <li className={itemClassname} key={name} onClick={onClick}>
      <Link href={url} prefetch={false}>
        <a className="nav-link">
          <FontAwesomeIcon icon={Icon} />
          <span>{name}</span>
        </a>
      </Link>
    </li>
  );
};

AsideLink.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  // Icon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
  //   .isRequired,
  classNames: PropTypes.string
};

export default AsideLink;
