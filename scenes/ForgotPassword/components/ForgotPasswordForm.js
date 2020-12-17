import React from "react";
import PropTypes from "prop-types";
import { Button, Label } from "@blueprintjs/core";

const ForgotPasswordForm = ({ onSubmit, email, setEmail, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      <p className="tx-color-05 tx-16 mg-b-30 tx-spacing-1">
        You will receive an email from us with instruction on how to reset your
        password
      </p>
      <div className="mg-b-35">
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
      <Button
        type="submit"
        appearance="primary"
        className="bp3-intent-primary bp3-fill tx-16"
        loading={loading}
      >
        Recover
      </Button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,

  loading: PropTypes.bool.isRequired
};

export default ForgotPasswordForm;
