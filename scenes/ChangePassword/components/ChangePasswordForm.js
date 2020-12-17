import React from "react";
import PropTypes from "prop-types";
import { Button, Label } from "@blueprintjs/core";

const ChangePasswordForm = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
  loading
}) => {
  return (
    <form onSubmit={onSubmit}>
      <p className="tx-color-05 tx-16 mg-b-30 pd-xl-r-60">
        If you are experiencing any problems signing in, email us on{" "}
        <a className="tx-semibold tx-underline" href="mailto:support@vuukle.com">
          support@vuukle.com
        </a>
        .
      </p>
      <div className="mg-b-20">
        <Label>
          Email
          <input
            type="email"
            className="form-control mg-sm-r-10"
            placeholder="Enter your Email"
            required
            pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,16}(?:\.[a-z]{2})?)$"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Label>
      </div>
      <Label>
        New Password
        <input
          type="password"
          className="form-control mg-sm-r-10"
          placeholder="New password"
          required
          min={6}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span className="tx-10 tx-regular">Minimum of 6 characters</span>
      </Label>
      <div className="mg-t--8 mg-b-35">
        <Label>
          Re-type Password
          <input
            type="password"
            className="form-control mg-sm-r-10"
            placeholder="Re-type password"
            required
            min={6}
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
        </Label>
      </div>
      <Button
        type="submit"
        appearance="primary"
        className="bp3-intent-yellow bp3-fill"
        loading={loading}
      >
        Change Password
      </Button>
    </form>
  );
};

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  repeatPassword: PropTypes.string.isRequired,
  setRepeatPassword: PropTypes.func.isRequired,

  loading: PropTypes.bool.isRequired
};

export default ChangePasswordForm;
