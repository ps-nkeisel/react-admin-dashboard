import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pane, SearchInput } from "evergreen-ui";
import UserItem from "./UserItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-solid-svg-icons";

const UserList = () => {
  const users = useSelector(({ settingsPage }) => settingsPage.users);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const setSearch = e => {
    setFilter(e.target.value);
    if (e.target.value) {
      setFilteredUsers(
        users.filter(user => user.email.includes(e.target.value))
      );
    } else {
      setFilteredUsers([]);
    }
  };

  return (
    <div> 
      <h3 className="tx-20 tx-spacing-1 mg-b-2">User List</h3>
      <p style={{marginBottom: '12px'}} className="d-flex tx-16 tx-color-05">
        Total count :  {users.length}
      </p>

      <div className="pos-relative" style={{marginBottom: '12px'}}>
        <input
          className="search-input outline-none"
          placeholder="Search User"
          value={filter}
          onChange={setSearch}
        />
        <FontAwesomeIcon icon={faSearch} className="pos-absolute" />
      </div>
      
      <div className="vu-users-table">
        <div className="vu-users-table__header vu-users-table__row d-flex tx-color-05">
          <div className="vu-users-table__cell vu-users-table__user"><span>USER</span></div>
          <div className="vu-users-table__cell vu-users-table__pages"><span>PAGES</span></div>
          <div className="vu-users-table__cell vu-users-table__options"><span>OPTIONS</span></div>
        </div>
        {(!filteredUsers || !filter) &&
          users &&
          users.map(user => (
            <UserItem
              key={user.email + user.host}
              user={user}
            />
          ))}
        {filteredUsers &&
          filteredUsers.map(user => (
            <UserItem
              key={user.email + user.host}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default UserList;
