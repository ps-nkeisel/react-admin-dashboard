import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position
} from "@blueprintjs/core";
import { Avatar } from "evergreen-ui";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/pro-solid-svg-icons";

import { loadSmallChat } from '@/components/SmallChat';

import { removeToken } from "@/services/actions/session";

const ProfileDropdown = () => {
  const dispatch = useDispatch();

  const sessionStore = useSelector(({ session }) => session);
  const { user, isUserAdmin } = sessionStore;

  const dropdownMenu = (
    <Menu style={{ minWidth: "230px", padding: "25px" }}>
      <div className="mb-3">
        <Avatar src={user.pictureUrl} name={user.name} size={45} />
        <h5 className="tx-semibold my-2">{user.name}</h5>
        <span className="text-muted">
          { isUserAdmin ? 'Admin' : 'Moderator' }
        </span>
      </div>
      <MenuItem
        onClick={() => Router.push("/settings")}
        icon="cog"
        text="Profile Settings"
      />
      <MenuItem
        onClick={() => dispatch(removeToken())}
        icon="log-out"
        text="Log out"
      />
      <MenuDivider />
      <MenuItem
        icon="lifesaver"
        text="Contact Support"
        href="mailto:support@admin.com"
      />
      { isUserAdmin &&
        <MenuItem
          icon="help"
          text="Chat with us"
          onClick={() => loadSmallChat()}
        />
      }
    </Menu>
  );

  return (
    <Popover
      content={dropdownMenu}
      position={Position.BOTTOM_RIGHT}
      minimal={true}
    >
      <a className="d-flex flex-row align-items-center popover__link profile-dropdown">
        <Avatar src={user.pictureUrl} name={user.name} size={34}></Avatar>
        <span className="ml-2">
          <span className="d-block tx-14 tx-color-05 tx-medium">
            {user.email}
          </span>
          <span className="d-block tx-uppercase tx-color-05 opacity-44 tx-medium tx-10 tx-spacing-1">
            {user.name}
          </span>
        </span>
        <FontAwesomeIcon
          className="tx-color-05 popover__arrow"
          icon={faSortDown}
        ></FontAwesomeIcon>
      </a>
    </Popover>
  );
};

export default ProfileDropdown;
