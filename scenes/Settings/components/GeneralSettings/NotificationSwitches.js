import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@blueprintjs/core";
import {
  generalSettingsActionTypes,
  setFlagRequest
} from "../../ducks/settings";

const NotificationSwitches = () => {
  const dispatch = useDispatch();
  const settingsPageSwitches = useSelector(({ settingsPage }) => settingsPage);
  const [admin, setAdmin] = useState(false);
  const [moderator, setModerator] = useState(false);
  const [allSites, setAllSites] = useState(false);

  useEffect(() => {
    setAdmin(settingsPageSwitches.notifyAdmin);
    setModerator(settingsPageSwitches.notifyModerator);
  }, [settingsPageSwitches]);

  const toggleNotification = (userGroup, value) => {
    switch (userGroup) {
      case "Admin":
        setAdmin(value);
        dispatch(
          setFlagRequest(
            generalSettingsActionTypes.SET_NOTIFICATION_FOR_ADMIN_REQUEST,
            value,
            2,
            allSites
          )
        );
        break;
      case "Moderator":
        setModerator(value);
        dispatch(
          setFlagRequest(
            generalSettingsActionTypes.SET_NOTIFICATION_FOR_MODERATOR_REQUEST,
            value,
            3,
            allSites
          )
        );
        break;
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="mg-b-10">Notification</h4>
        <div className="custom-control flex-shrink-0 custom-checkbox">
          <input
            className="form-check-input custom-control-input"
            type="checkbox"
            id="applyAllNotif"
            value={allSites}
            onChange={e => setAllSites(e.target.checked)}
          />
          <label
            className="custom-control-label tx-color-05"
            htmlFor="applyAllNotif"
          >
            Apply to all sites
          </label>
        </div>
      </div>
      <p className="tx-16 tx-color-05">
        Allow email notification for every comment reply
      </p>
      <div className="bg-white pd-t-12 pd-b-2 rounded-4">
        <Switch
          checked={admin}
          onChange={e => toggleNotification("Admin", e.target.checked)}
          label="Admin"
        />
        <Switch
          checked={moderator}
          onChange={e => toggleNotification("Moderator", e.target.checked)}
          label="Moderator"
        />
      </div>
    </>
  );
};

export default NotificationSwitches;
