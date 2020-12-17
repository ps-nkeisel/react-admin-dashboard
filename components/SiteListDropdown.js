import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { SelectMenu, Button, Position } from "evergreen-ui";
import { updateHost } from "@/services/actions/filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-solid-svg-icons";

const SiteListDropdown = ({ className, title, onChange, excludeAllSites }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { pathname, query } = router;

  const siteList = useSelector(({ session }) => session.sites);
  const filterStore = useSelector(({ filter }) => filter);
  const filterHost = filterStore.host;
  const [host, setHost] = useState(filterHost);

  useEffect(() => {
    if (filterHost != host) {
      setHost(filterHost);
    }
  }, [filterHost]);

  const handleChange = item => {
    setHost(item.value);
    dispatch(updateHost(item.value));

    query.host = item.value;
    router.push({ pathname, query });

    if (onChange && typeof onChange === "function") {
      onChange(item.value);
    }
  };

  if (!siteList) {
    return null;
  }

  const options = (excludeAllSites || siteList.length <= 1)
    ? [...siteList.map(label => ({ label, value: label }))]
    : [
        { label: "All Sites", value: "" },
        ...siteList.map(label => ({ label, value: label }))
      ];

  return (
    <SelectMenu
      className={className}
      title={title || "Select a site..."}
      selected={host || ""}
      options={options}
      onSelect={handleChange}
      position={Position.BOTTOM}
      closeOnSelect={true}
    >
      <Button
        paddingLeft={0}
        paddingRight={15}
        display="block"
        height={"auto"}
        appearance="minimal"
        intent="none"
        fontSize={16}
        fontWeight={"bold"}
        className="site-list__button"
      >
        {/* <img src={"//logo.clearbit.com/" + host} alt={host} /> */}
        {host || title || "All Sites"}
        <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
      </Button>
    </SelectMenu>
  );
};

export default SiteListDropdown;
