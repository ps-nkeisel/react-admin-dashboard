import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../ducks/settings";
import { toaster } from "evergreen-ui";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const settingsData = useSelector(({ settingsPage }) => settingsPage);
  const [allSites, setAllSites] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileAvatarURL, setProfileAvatarURL] = useState("");
  const [savedProfileName, setSavedProfileName] = useState("");
  const [savedProfileAvatarURL, setSavedProfileAvatarURL] = useState("");

  useEffect(() => {
    setProfileName(settingsData.name || "");
    setSavedProfileName(settingsData.name || "");
    setProfileAvatarURL(settingsData.avatar || "");
    setSavedProfileAvatarURL(settingsData.avatar || "");
  }, [settingsData]);

  const updateProfile = (profileName, profileAvatar) => {
    const trimmedName = profileName.trim();
    if (trimmedName.length >= 2 && trimmedName.length <= 100) {
      dispatch(
        actions.profileUpdateRequest(profileName, profileAvatar, allSites)
      );
    } else {
      toaster.danger("The profile name is either too short or too long", {
        id: "invalid-profile-name"
      });
    }
  };

  return (
    <>
      <h3 className="tx-20 tx-spacing-1">Profile</h3>
      <p className="tx-color-05 tx-16">Your personal information</p>
      <div className="form-group">
        <label htmlFor="profileName" className="bp3-label">
          Name
          <input
            type="text"
            className="form-control"
            id="profileName"
            placeholder="Name"
            value={profileName}
            onChange={e => setProfileName(e.target.value)}
          />
        </label>
        {savedProfileName !== profileName &&
          profileName &&
          profileName.length >= 0 && (
            <div className="d-flex justify-content-between mt-2 pl-4">
              <div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="applyAllProfileName"
                  value={allSites}
                  checked={allSites}
                  onChange={e => setAllSites(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="applyAllProfileName"
                >
                  Apply to all sites
                </label>
              </div>
              <button
                onClick={() => {
                  setSavedProfileName(profileName);
                  updateProfile(profileName, savedProfileAvatarURL);
                }}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          )}
      </div>
      <div className="form-group">
        <label htmlFor="profileAvatarURL" className="bp3-label">
          Avatar URL
          <input
            type="text"
            className="form-control"
            id="profileAvatarURL"
            placeholder="Avatar URL"
            value={profileAvatarURL}
            onChange={e => setProfileAvatarURL(e.target.value)}
          />
        </label>
        {savedProfileAvatarURL !== profileAvatarURL &&
          profileAvatarURL &&
          profileAvatarURL.length >= 0 && (
            <div className="d-flex justify-content-between mt-2 pl-4">
              <div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="applyAllAvatar"
                  value={allSites}
                  checked={allSites}
                  onChange={e => setAllSites(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="applyAllAvatar">
                  Apply to all sites
                </label>
              </div>
              <button
                onClick={() => {
                  setSavedProfileAvatarURL(profileAvatarURL);
                  updateProfile(savedProfileName, profileAvatarURL);
                }}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          )}
      </div>
      {savedProfileAvatarURL && (
        <img src={savedProfileAvatarURL} className="img-thumbnail" />
      )}
    </>
  );
};

export default ProfileForm;
