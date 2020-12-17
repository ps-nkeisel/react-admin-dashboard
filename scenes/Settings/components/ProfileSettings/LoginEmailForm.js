import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminEmailUpdateRequest } from "../../ducks/settings";

const LoginEmailForm = () => {
  const dispatch = useDispatch();
  const adminEmail = useSelector(({ settingsPage }) => settingsPage.adminEmail);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(adminEmail);
  }, [adminEmail]);

  const updateEmail = () => {
    setPassword("");
    dispatch(adminEmailUpdateRequest(email, password));
  };

  return (
    <>
      <h3 className="tx-20 tx-spacing-1">Login Email</h3>
      <p className="tx-color-05 tx-16 mg-b-20">
        This email is used to login to dashboard
      </p>
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="loginEmail" className="bp3-label">
            Login Email
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              placeholder="Enter new email"
              pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,16}(?:\.[a-z]{2})?)$"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="loginEmailFormPass" className="bp3-label">
            Enter Password
            <input
              type="password"
              className="form-control"
              id="loginEmailFormPass"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group d-flex justify-content-end">
          <button
            className="btn-primary btn-fill tx-16"
            disabled={!email || !password}
            onClick={updateEmail}
          >
            Change Email
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginEmailForm;
