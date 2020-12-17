import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Button, Label } from "@blueprintjs/core";
import GoogleSearch from '@/static/images/google-search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-solid-svg-icons";

const LoginForm = ({
  emailCheck,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  onContinue,
  loading
}) => {
  const [typeInput, setTypeInput] = useState('password');

  const handleShowPassword = (typeInput) => {
    if (typeInput === 'password') {
      setTypeInput('text');
    }
    if (typeInput !== 'password') {
      setTypeInput('password');
    }
  }
  return (
    <form onSubmit={onSubmit}>
      {!emailCheck ? (<>
        <div className="form-group">
          <Label className="mg-b-35-f">
            Email
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              required
              pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,16}(?:\.[a-z]{2})?)$"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Label>
        </div>
        <Button
          onClick={onContinue}
          loading={loading}
          appearance="primary"
          type="button"
          className="bp3-fill bp3-intent-primary rounded-5 tx-16"
        >
          Continue
        </Button>
      </>):(<>
        <div className="form-group mg-b-35">
          <Label className="pos-relative">
            Password
            <input
              type={typeInput}
              className="form-control"
              placeholder="Enter your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
            onClick={() => handleShowPassword(typeInput)}
            icon={faEye}
            className="pass-trigger pos-absolute r-15 b-15"></FontAwesomeIcon>
          </Label>
        </div>
        <Button
          loading={loading}
          appearance="primary"
          type="submit"
          className="bp3-fill bp3-intent-primary rounded-5 tx-16"
        >
          Sign In
        </Button>
      </>)}

        {/* <p className="mg-25 text-center">or</p>
        <Button
          appearance="primary"
          type="button"
          className="btn-outline-google tx-16"
        >
          <span className="mg-r-8">
            <GoogleSearch />
          </span>
            Sign in with Google
        </Button> */}
      <div className="mg-t-25 d-flex justify-content-between">
        <Link href="/forgot-password" prefetch={false}>
          <a className="tx-color-05">Forgot password?</a>
        </Link>
        <Link href="/register" prefetch={false}>
          <a className="tx-color-05">Don't have account yet?</a>
        </Link>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  emailCheck: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default LoginForm;
