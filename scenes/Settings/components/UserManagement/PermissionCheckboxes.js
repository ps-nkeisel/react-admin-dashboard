import React, { useState, useEffect } from "react";
import { Switch } from "@blueprintjs/core";

const PermissionCheckboxes = ({ onChange, permissionPoints }) => {
  const [revenue, setRevenue] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [moderation, setModeration] = useState(false);
  const [integration, setIntegration] = useState(false);
  const [userManagement, setUserManagement] = useState(false);
  const [allChecked, setAllChecked] = useState(
    revenue && analytics && moderation && userManagement && integration
  );

  useEffect(() => {
    if (typeof permissionPoints === "number") {
      let points = permissionPoints;
      if (points === 55) {
        checkAll(true)
      } else {
        checkAll(false);
        if (points >= 32) {
          setUserManagement(true);
          points -= 32;
        } else {
          setUserManagement(false);
        }

        if (points >= 16) {
          setIntegration(true);
          points -= 16;
        } else {
          setIntegration(false);
        }

        if (points >= 4) {
          setModeration(true);
          points -= 4;
        } else {
          setModeration(false);
        }

        if (points >= 2) {
          setAnalytics(true);
          points -= 2;
        } else {
          setAnalytics(false);
        }

        if (points >= 1) {
          setRevenue(true);
          points--;
        } else {
          setRevenue(false);
        }
      }
    }
  }, [permissionPoints]);

  useEffect(() => {
    if (typeof onChange === "function") {
      const permissionsObject = {
        all: allChecked,
        revenue,
        analytics,
        moderation,
        userManagement,
        integration
      };
      onChange(permissionsObject);
    }

    if (revenue && analytics && moderation && userManagement && integration) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [allChecked, revenue, analytics, moderation, userManagement, integration]);

  const checkAll = checked => {
    setAllChecked(checked);
    setIntegration(checked);
    setUserManagement(checked);
    setModeration(checked);
    setAnalytics(checked);
    setRevenue(checked);
  };

  return (
    <div className="bg-white pd-t-12 pd-b-2 mg-b-25 rounded-4 permission-checkboxes">
      <Switch
        checked={allChecked}
        onChange={e => checkAll(e.target.checked)}
        label="All Pages"
      />
      <Switch
        checked={revenue}
        onChange={e => setRevenue(e.target.checked)}
        label="Revenue"
      />
      <Switch
        checked={analytics}
        onChange={e => setAnalytics(e.target.checked)}
        label="Analytics"
      />
      <Switch
        checked={moderation}
        onChange={e => setModeration(e.target.checked)}
        label="Moderation"
      />
      <Switch
        checked={integration}
        onChange={e => setIntegration(e.target.checked)}
        label="Integration"
      />
      <Switch
        checked={userManagement}
        onChange={e => setUserManagement(e.target.checked)}
        label="User Management"
      />
    </div>
  );
};

export default PermissionCheckboxes;
