import React from "react";
import AddUser from '../components/UserManagement/AddUser';
import UserList from '../components/UserManagement/UserList';

const UserManagement = () => {
  return (
    <div className="vu-advanced-settings">
      <AddUser />
      <UserList />
    </div>
  );
};

export default UserManagement;
