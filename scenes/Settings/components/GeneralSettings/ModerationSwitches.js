import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@blueprintjs/core";
import {
  generalSettingsActionTypes,
  setFlagRequest
} from "../../ducks/settings";

const ModerationSwitches = () => {
  const dispatch = useDispatch();
  const generalModerationEnabled = useSelector(
    ({ settingsPage }) => settingsPage.moderation
  );
  const linkModerationEnabled = useSelector(
    ({ settingsPage }) => settingsPage.linksToModeration
  );
  const imagesModerationEnabled = useSelector(
    ({ settingsPage }) => settingsPage.imagesToModeration
  );
  const [generalChecked, setGeneralChecked] = useState(false);
  const [linkChecked, setLinkChecked] = useState(false);
  const [imagesChecked, setImagesChecked] = useState(false);
  const [allSites, setAllSites] = useState(false);

  useEffect(() => {
    setGeneralChecked(generalModerationEnabled);
    setLinkChecked(linkModerationEnabled);
    setImagesChecked(imagesModerationEnabled);
  }, [
    generalModerationEnabled,
    linkModerationEnabled,
    imagesModerationEnabled
  ]);

  const toggleModeration = (value, type) => {
    switch (type) {
      case "general":
        setGeneralChecked(value);
        dispatch(
          setFlagRequest(
            generalSettingsActionTypes.SET_MODERATION_FLAG_REQUEST,
            value,
            0,
            allSites
          )
        );
        break;
      case "link":
        setLinkChecked(value);
        dispatch(
          setFlagRequest(
            generalSettingsActionTypes.SET_LINK_MODERATION_FLAG_REQUEST,
            value,
            10,
            allSites
          )
        );
        break;
      case "images":
        setImagesChecked(value);
        dispatch(
          setFlagRequest(
            generalSettingsActionTypes.SET_IMAGES_MODERATION_FLAG_REQUEST,
            value,
            11,
            allSites
          )
        );
        break;
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="mg-b-10 pd-b-2">Moderation</h4>
        <div className="custom-control flex-shrink-0 custom-checkbox">
          <input
            className="form-check-input custom-control-input"
            type="checkbox"
            id="applyAllModeration"
            value={allSites}
            onChange={e => setAllSites(e.target.checked)}
          />
          <label
            className="custom-control-label tx-color-05"
            htmlFor="applyAllModeration"
          >
            Apply to all sites
          </label>
        </div>
      </div>
      <div className="bg-white pd-t-12 pd-b-2 mg-b-15 rounded-4">
        <Switch
          checked={generalChecked}
          onChange={e => toggleModeration(e.target.checked, "general")}
          label="Stop comments/replies from appearing on article page before approval"
        />
        <Switch
          checked={linkChecked}
          onChange={e => toggleModeration(e.target.checked, "link")}
          label="Send comments with links to moderation"
        />
        <Switch
          checked={imagesChecked}
          onChange={e => toggleModeration(e.target.checked, "images")}
          label="Send comments with images to moderation"
        />
      </div>
    </>
  );
};

export default ModerationSwitches;
