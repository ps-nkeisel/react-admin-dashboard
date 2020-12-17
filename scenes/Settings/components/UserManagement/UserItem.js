import React, { useState } from "react";
import PermissionCheckboxes from "./PermissionCheckboxes";
import { actions } from "../../ducks/settings";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { calculatePermissions } from "../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faTimes } from "@fortawesome/pro-solid-svg-icons";

import { toaster } from "evergreen-ui";

const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isPassShown, setIsPassShown] = useState(false);
  const [allSites, setAllSites] = useState(false);
  const [permissions, setPermissions] = useState({
    all: false,
    revenue: false,
    analytics: false,
    moderation: false,
    userManagement: false,
    integration: false
  });

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleCheckboxTick = permissionsObject => {
    setPermissions(permissionsObject);
  };

  const updateUser = () => {
    const permissionsPoints = calculatePermissions(permissions);
    dispatch(
      actions.updateUserRequest(
        user.email,
        permissionsPoints,
        allSites ? "" : user.host
      )
    );
  };

  return (
    <div className="vu-users-table__row">
      <div>
        <div className="d-flex vu-users-table__top">
          <div className="vu-users-table__cell vu-users-table__user">
            <p className="tx-13 mb-1">{user.email}</p>
            <p className="tx-12 tx-color-05 mb-0">{user.host}</p>
          </div>
          <div className="vu-users-table__cell vu-users-table__pages">
            {user.userPermissions.map(permission => (
              <div
                className="vu-filter-label"
                key={permission + user.email + user.host}
              >
                {permission === "UserManagement"
                  ? "User Management"
                  : permission}
              </div>
            ))}
          </div>
          <div className="vu-users-table__cell vu-users-table__options">
            <button
              className="btn btn-edit"
              onClick={() => setExpanded(!expanded)}
            >
              <FontAwesomeIcon className="mr-1" icon={faEdit} />
              Edit
            </button>
            <button
              className="btn btn-alert btn-delete d-lg-block"
              onClick={() => setIsShown(true)}
            >
              <FontAwesomeIcon className="mr-1" icon={faTrashAlt} />
              Delete
            </button>

            <Modal
              className="vu-users-table__modal"
              show={isShown}
              onHide={() => setIsShown(false)}
            >
              <Modal.Header className="pd-y-20 pd-x-20 pd-sm-x-30">
                <Modal.Title>Are you sure?</Modal.Title>
                <FontAwesomeIcon
                  onClick={() => setIsShown(false)}
                  icon={faTimes}
                  className="svg-inline--fa fa-w-18"
                ></FontAwesomeIcon>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Are you sure you want to delete the user with following email{" "}
                  <strong>{user.email}</strong>?
                </p>
              </Modal.Body>
              <Modal.Footer className="pd-x-20 pd-y-15">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setIsShown(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(
                      actions.deleteUserRequest(user.email, user.host, allSites)
                    );
                    setIsShown(false);
                  }}
                >
                  Delete
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <div
        className={expanded ? "d-block vu-users-table__cell-inner" : "d-none"}
      >
        <div className="d-flex flex-column flex-lg-row">
          <div className="order-2 order-lg-1 w-100">
            <PermissionCheckboxes
              permissionPoints={user.permissions}
              onChange={handleCheckboxTick}
            />
          </div>

          <div className="custom-control custom-checkbox order-1 flex-shrink-0 order-lg-2">
            <input
              className="form-check-input custom-control-input"
              type="checkbox"
              id={"allSites" + user.email + user.host}
              value={allSites}
              onChange={e => setAllSites(e.target.checked)}
            />
            <label
              className="custom-control-label tx-color-05"
              htmlFor={"allSites" + user.email + user.host}
            >
              Apply to all sites
            </label>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between justify-content-lg-end">
          <button
            className="btn btn-warning text-white mr-lg-2"
            onClick={() => setIsPassShown(true)}
          >
            Change password
          </button>
          <button
            className="btn btn-alert btn-delete d-block d-lg-none"
            onClick={() => setIsShown(true)}
          >
            Delete
          </button>
          <button
            className="btn btn-primary"
            disabled={calculatePermissions(permissions) === 0}
            onClick={updateUser}
          >
            Save
          </button>

          <Modal
            className="vu-users-table__modal"
            show={isPassShown}
            onHide={() => setIsPassShown(false)}
          >
            <Modal.Header className="pd-y-20 pd-x-20 pd-sm-x-30">
              <Modal.Title>Change password</Modal.Title>
              <FontAwesomeIcon
                onClick={() => setIsPassShown(false)}
                icon={faTimes}
                className="svg-inline--fa fa-w-18"
              ></FontAwesomeIcon>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor={"userPassword" + user.email + user.host}>
                    Password:
                  </label>
                  <input
                    type="password"
                    value={password}
                    minLength={5}
                    maxLength={32}
                    className="form-control"
                    id={"userPassword" + user.email + user.host}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor={"repeatUserPassword" + user.email + user.host}
                  >
                    Repeat Password:
                  </label>
                  <input
                    type="password"
                    value={repeatPassword}
                    className="form-control"
                    minLength={5}
                    maxLength={32}
                    id={"repeatUserPassword" + user.email + user.host}
                    placeholder="Confirm new password"
                    onChange={e => setRepeatPassword(e.target.value)}
                    required
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer className="pd-x-20 pd-y-15">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setIsPassShown(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  password && repeatPassword && password !== repeatPassword
                }
                onClick={() => {
                  const trimmedPassword = password.trim();
                  const trimmedRepeat = repeatPassword.trim();
                  const passwordLengthIsInRange =
                    trimmedPassword.length >= 5 && trimmedPassword.length <= 32;
                  const repeatLengthIsInRange =
                    trimmedRepeat.length >= 5 && trimmedRepeat.length <= 32;
                  const validationPasses =
                    passwordLengthIsInRange & repeatLengthIsInRange;
                  if (validationPasses) {
                    dispatch(
                      actions.setUserPasswordRequest(user.email, password)
                    );
                    setIsPassShown(false);
                  } else {
                    toaster.danger(
                      "Your password inputs either don't match or are too long/short",
                      { id: "invalid-user-password" }
                    );
                  }
                }}
              >
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
