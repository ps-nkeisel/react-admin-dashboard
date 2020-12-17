import React from "react";
import PropTypes from "prop-types";
import { Button, Label } from "@blueprintjs/core";
import Link from "next/link";

const RegisterForm = ({
  onSubmit,
  host,
  setHost,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  agree,
  setAgree,
  loading
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <Label>
          Site
          <input
            type="text"
            className="form-control"
            placeholder="https://example.com"
            required
            pattern="^(https?://)[^\s]+$"
            value={host}
            onChange={e => setHost(e.target.value)}
          />
        </Label>
      </div>
      <div className="form-group">
        <Label>
          Email
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            required
            pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,16}(?:\.[a-z]{2})?)$"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Label>
      </div>
      <div className="form-group">
        <Label>
          Name
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Label>
      </div>
      <div className="form-group">
        <Label>
          Password
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            required
            minLength={5}
            maxLength={32}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Label>
      </div>
      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            id="agree"
            className="custom-control-input"
            required
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
          />
          <label className="custom-control-label tx-color-05" htmlFor="agree">
            <span className="mr-1">I agree to the </span>
            <a href="https://docs.vuukle.com/privacy-and-policy/">
              Terms of Service
            </a>
          </label>
        </div>
      </div>
      <Button
        type="submit"
        appearance="primary"
        className="bp3-fill bp3-intent-primary tx-medium tx-16 mg-t-40"
        loading={loading}
      >
        Register
      </Button>
      <div className="mg-t-25 d-flex justify-content-center">
        <Link href="/login">
          <a className="tx-color-05">I already have an account</a>
        </Link>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  host: PropTypes.string.isRequired,
  setHost: PropTypes.func.isRequired,

  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,

  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,

  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,

  agree: PropTypes.bool.isRequired,
  setAgree: PropTypes.func.isRequired,

  loading: PropTypes.bool.isRequired
};

export default RegisterForm;
