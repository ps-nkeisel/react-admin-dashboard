import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../ducks/settings";
import { calculatePermissions } from "../../utils";
import PermissionCheckboxes from "./PermissionCheckboxes";

const AddUser = () => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [validityClass, setValidityClass] = useState("");
  const [validity, setValidity] = useState(false);
  const [allSites, setAllSites] = useState(false);
  const [permissions, setPermissions] = useState({
    all: false,
    revenue: false,
    analytics: false,
    moderation: false,
    userManagement: false,
    integration: false
  });
  const [points, setPoints] = useState(calculatePermissions(permissions));

  const handleCheckboxTick = permissionsObject => {
    setPermissions(permissionsObject);
    setPoints(permissionsObject);
  };

  const addUser = () => {
    const permissionsPoints = calculatePermissions(permissions);
    const allChecksDisabled = {
      all: false,
      revenue: false,
      analytics: false,
      moderation: false,
      userManagement: false,
      integration: false
    };
    dispatch(actions.addUserRequest(userEmail, permissionsPoints, allSites));
    setUserEmail("");
    setValidityClass("");
    setValidity(false);
    setPermissions(allChecksDisabled);
    setPoints(calculatePermissions(allChecksDisabled));
  };

  const setValidityIndicator = (value, invalid) => {
    if (value.length === 0) {
      setValidityClass("");
    } else if (value.length > 0 && invalid) {
      setValidityClass("is-invalid");
    } else {
      setValidityClass("is-valid");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3 className="tx-20 tx-spacing-1 mb-4">Add New User</h3>
        <div className="custom-control custom-checkbox">
          <input
            className="form-check-input custom-control-input"
            type="checkbox"
            id="addToAllUser"
            value={allSites}
            checked={allSites}
            onChange={e => setAllSites(e.target.checked)}
          />
          <label
            className="custom-control-label tx-color-05"
            htmlFor="addToAllUser"
          >
            Apply to all sites
          </label>
        </div>
      </div>
      
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-group vu-advanced-settings__row mb-4">
          <label htmlFor="blockWord" className="bp3-label">
            Email address
          </label>
          <div className="d-flex">
            <input
              type="email"
              id="UserEmailAddress"
              className={`form-control ${validityClass}`}
              placeholder="Enter Email"
              pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,16}(?:\.[a-z]{2})?)$"
              value={userEmail}
              onChange={e => {
                setValidity(e.target.validity.valid);
                setValidityIndicator(e.target.value, !e.target.validity.valid);
                setUserEmail(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <PermissionCheckboxes onChange={handleCheckboxTick} permissionPoints={points} />
        <button
          onClick={addUser}
          className="btn btn-primary btn-fill com-widget__btn mb-4"
          disabled={
            !userEmail ||
            !validity ||
            calculatePermissions(permissions) === 0
          }
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
