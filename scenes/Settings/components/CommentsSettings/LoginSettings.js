import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsSettingsActions, setLoginToSSO } from "../../ducks/settings";
import { Switch } from "@blueprintjs/core";

const LoginSettings = () => {
  const dispatch = useDispatch();
  const loginTypes = useSelector(({ settingsPage }) => settingsPage.loginTypes);
  const [vuukleGuest, setVuukleGuest] = useState(false);
  const [vuuklePassword, setVuuklePassword] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);
  const [twitterAuth, setTwitterAuth] = useState(false);
  const [disqusAuth, setDisqusAuth] = useState(false);
  const [facebookAuth, setFacebookAuth] = useState(false);
  const [SSO, setSSO] = useState(false);
  const [allSites, setAllSites] = useState(false);

  useEffect(() => {
    if (typeof loginTypes === "number") {
      let points = loginTypes;

      if (points >= 64) {
        setSSO(true);
        points -= 64;
      } else {
        setSSO(false);
      }

      if (points >= 32) {
        setVuukleGuest(true);
        points -= 32;
      } else {
        setVuukleGuest(false);
      }

      if (points >= 16) {
        setDisqusAuth(true);
        points -= 16;
      } else {
        setDisqusAuth(false);
      }

      if (points >= 8) {
        setTwitterAuth(true);
        points -= 8;
      } else {
        setTwitterAuth(false);
      }

      if (points >= 4) {
        setGoogleAuth(true);
        points -= 4;
      } else {
        setGoogleAuth(false);
      }

      if (points >= 2) {
        setFacebookAuth(true);
        points -= 2;
      } else {
        setFacebookAuth(false);
      }

      if (points >= 1) {
        setVuuklePassword(true);
        points--;
      } else {
        setVuuklePassword(false);
      }
    }
  }, [loginTypes]);

  const setSSOOnly = () => {
    setVuukleGuest(false);
    setDisqusAuth(false);
    setTwitterAuth(false);
    setGoogleAuth(false);
    setFacebookAuth(false);
    setVuuklePassword(false);
    setSSO(true);
    dispatch(setLoginToSSO(allSites));
  };

  const updateLoginTypes = () => {
    const loginTypes = [
      {
        loginType: 1,
        isAllowed: vuuklePassword
      },
      {
        loginType: 2,
        isAllowed: facebookAuth
      },
      {
        loginType: 4,
        isAllowed: googleAuth
      },
      {
        loginType: 8,
        isAllowed: twitterAuth
      },
      {
        loginType: 16,
        isAllowed: disqusAuth
      },
      {
        loginType: 32,
        isAllowed: vuukleGuest
      },
      {
        loginType: 64,
        isAllowed: SSO
      }
    ];
    dispatch(commentsSettingsActions.setLoginTypes(loginTypes, allSites));
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="tx-20 tx-spacing-1 mg-b-10">Login Settings</h3>
        <div className="custom-control custom-checkbox">
          <input
            className="form-check-input custom-control-input"
            type="checkbox"
            id="applyAllLoginTypes"
            value={allSites}
            onChange={e => setAllSites(e.target.checked)}
          />
          <label
            className="custom-control-label tx-color-05"
            htmlFor="applyAllLoginTypes"
          >
            Apply to all sites
          </label>
        </div>
      </div>
      <p className="tx-16 tx-color-05">
        Enable/Disable auth methods for Vuukle comments widget
      </p>
      <div className="bg-white pd-t-12 pd-b-2 mg-b-25 rounded-4">
        <Switch
          id="vuukleGuestAuth"
          checked={vuukleGuest}
          onChange={e => setVuukleGuest(e.target.checked)}
          label="Vuukle Guest"
        />
        <Switch
          id="vuuklePasswordAuth"
          checked={vuuklePassword}
          onChange={e => setVuuklePassword(e.target.checked)}
          label="Vuukle Password"
        />
        <Switch
          id="googleAuth"
          checked={googleAuth}
          onChange={e => setGoogleAuth(e.target.checked)}
          label="Google"
        />
        <Switch
          id="twitterAuth"
          checked={twitterAuth}
          onChange={e => setTwitterAuth(e.target.checked)}
          label="Twitter"
        />
        <Switch
          id="disqusAuth"
          checked={disqusAuth}
          onChange={e => setDisqusAuth(e.target.checked)}
          label="Disqus"
        />
        <Switch
          id="facebookAuth"
          checked={facebookAuth}
          onChange={e => setFacebookAuth(e.target.checked)}
          label="Facebook"
        />
        <Switch
          id="ssoAuth"
          checked={SSO}
          onChange={e => setSSO(e.target.checked)}
          label="SSO"
        />
      </div>
      <button
        className="btn-primary btn-fill mg-b-25 com-widget__btn tx-16"
        onClick={() => updateLoginTypes()}
      >
        Update
      </button>
      <button
        className="btn btn-fill com-widget__btn btn-bordered-brand-01 tx-16"
        onClick={() => setSSOOnly()}
      >
        Set login method to SSO only
      </button>
    </>
  );
};

export default LoginSettings;
