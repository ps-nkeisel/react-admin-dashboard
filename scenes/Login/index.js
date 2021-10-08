import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { toaster } from "evergreen-ui";
import Cookies from "js-cookie";

import LoginForm from "./components/LoginForm";

import { logInAPI, getUserType } from "@/services/api/auth";
import { saveToken } from "@/services/actions/session";

import { MAX_LOGIN_ATTEMPS } from "./constants";
import LoginImage from "@/static/images/login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";

const LoginScene = () => {
  const { prevUrl } = useSelector(({ session }) => session);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  let loginAttempts = 0;

  if (Cookies.get("login_attempts")) {
    loginAttempts = parseInt(Cookies.get("login_attempts"));
  }

  const onContinue = async () => {
    setLoading(true);
    try {
      const userType = await getUserType(email);
      if (userType) {
        setEmailCheck(true);
        setLoading(false);
        if (userType === "comment") {
          window.location.replace(`https://news.admin.com?email=${email}`);
        }
      }

    } catch (err) {
      setError(true);
      toaster.danger(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    // do not submit before email validation
    if (!emailCheck) {
      onContinue();
      return false;
    }

    setLoading(true);
    try {
      const token = await logInAPI(email, password);
      dispatch(saveToken(token));

      Cookies.remove("login_attempts");

      setTimeout(() => {
        Router.push(prevUrl);
      }, 1000);
    } catch (err) {
      loginAttempts++;

      Cookies.set("login_attempts", loginAttempts.toString(), {
        expires: 1,
        sameSite: "lax"
      });

      setError(true);
      toaster.danger(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-auth">
      <div className="d-flex justify-content-lg-center flex-lg-row flex-column align-items-center align-items-lg-start">
        <div className="sign-wrapper pd-x-15 pd-lg-x-50 pd-xl-x-65 pd-lg-b-0 w-100">
          <div className="box-shadow-lg-0-4-12-black-15 rounded-12 pd-lg-35">
            <div className="mg-lg-b-25 mg-b-50 pos-relative">
              <Link href="/">
                <a className="tx-color-05">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="mg-r-10"
                  ></FontAwesomeIcon>
                  Back
                </a>
              </Link>
              <div className="text-center d-block d-lg-none pos-absolute pos-absolute--centered">
                <a href="/" className="d-inline-block auth-logo large-logo">
                  <img
                    src="/static/images/logo.svg"
                    alt="Admin Logo"
                    className="w-100"
                  />
                </a>
              </div>
            </div>
            <h4 className="tx-color-01 mg-b-5 tx-24 tx-semibold text-break">
              {email && emailCheck ? email : "Sign In"}
            </h4>
            <p className="tx-color-05 tx-16 mg-b-30">
              Welcome back! Please Sign In to continue.
            </p>
            {loginAttempts < MAX_LOGIN_ATTEMPS ? (
              <LoginForm
                emailCheck={emailCheck}
                onContinue={onContinue}
                onSubmit={onSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
              />
            ) : (
              <div className="alert alert-danger" role="alert">
                You have been locked from logging in because you had too many
                failed login attempts in a short amount of time.
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow-1 flex-shrink-1 d-flex justify-content-center pd-t-70 pd-lg-t-20 pd-lg-x-15 pd-x-80 w-100 auth-media">
          <LoginImage />
        </div>
      </div>
    </div>
  );
};

export default LoginScene;
