import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminPasswordUpdateRequest } from "../../ducks/settings";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const handlePasswordChange = () => {
    dispatch(adminPasswordUpdateRequest(password, newPassword));
  };

  const trimmedPassword = password.trim();
  const trimmedNewPassword = newPassword.trim();
  const passwordsAreTheSame = trimmedPassword === trimmedNewPassword;
  const newAndRepeatedPassNotMatch =
    trimmedNewPassword !== repeatNewPassword.trim();
  const oneOfInputsNotFilled =
    !trimmedPassword || !trimmedNewPassword || !repeatNewPassword.trim();
  const newPasswordNotLongEnough =
    trimmedNewPassword.length < 6 || repeatNewPassword.trim().length < 6;

  const formNotValid =
    passwordsAreTheSame ||
    newAndRepeatedPassNotMatch ||
    oneOfInputsNotFilled ||
    newPasswordNotLongEnough;

  return (
    <>
      <h3 className="tx-20 tx-spacing-1">Password</h3>
      <p className="tx-color-05 tx-16">Change your password</p>
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="currentPassword" className="bp3-label">
            Current Password
            <input
              type="password"
              value={password}
              className="form-control"
              id="currentPassword"
              placeholder="Enter your current password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword" className="bp3-label">
            New Password
            <input
              type="password"
              value={newPassword}
              className="form-control"
              minLength={6}
              id="newPassword"
              placeholder="Enter your new password"
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="newPasswordAgain" className="bp3-label">
            Repeat New Password
            <input
              type="password"
              value={repeatNewPassword}
              minLength={6}
              className="form-control"
              id="newPasswordAgain"
              placeholder="Repeat your new password"
              onChange={e => setRepeatNewPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {/** Show alert when newPassword and repeatNewPassword are filled but they don't match */}
        {trimmedNewPassword &&
          repeatNewPassword.trim() &&
          trimmedNewPassword !== repeatNewPassword.trim() && (
            <div className="alert alert-danger">
              New password and repeated password don't match
            </div>
          )}
        {/** Show alert when password fields are filled but old and new passwords are the same */}
        {trimmedPassword &&
          trimmedNewPassword &&
          trimmedPassword === trimmedNewPassword && (
            <div className="alert alert-danger">
              Your current and new passwords are exactly the same
            </div>
          )}
        {/** Show alert when typed new password is too short */}
        {trimmedNewPassword && trimmedNewPassword.length < 6 && (
          <div className="alert alert-danger">
            Your new password must be at least 6 characters long
          </div>
        )}
        <div className="form-group d-flex justify-content-end">
          <button
            className="btn-primary btn-fill tx-16"
            disabled={formNotValid}
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
