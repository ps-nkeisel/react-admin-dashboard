import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { toaster } from "evergreen-ui";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";
import { registerAPI } from "@/services/api/auth";
import { saveToken } from "@/services/actions/session";
import LoginImage from '@/static/images/login';

const RegisterScene = () => {
  const dispatch = useDispatch();

  const [host, setHost] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    try {
      const data = await registerAPI(host, email, name, password);
      const { authTicket } = data;
      dispatch(saveToken(authTicket.token));
      Router.push("/");
    } catch (err) {
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
            <div className="mg-b-35">
              <div className="text-center d-block d-lg-none">
                <a href="/" className="d-inline-block auth-logo large-logo">
                  <img
                    src="/static/images/logo.svg"
                    alt="Admin Logo"
                    className="w-100"
                  />
                </a>
              </div>
            </div>
            <h4 className="tx-color-01 mg-b-5 tx-24 tx-semibold">
              Create a New Account
            </h4>
            <p className="tx-color-05 tx-16 mg-b-30">
              It's free to signup and only takes a minute
            </p>
            <RegisterForm
              onSubmit={onSubmit}
              host={host}
              setHost={setHost}
              email={email}
              setEmail={setEmail}
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
              agree={agree}
              setAgree={setAgree}
              loading={loading}
            />
          </div>
        </div>
        <div className="flex-grow-1 flex-shrink-1 d-flex justify-content-center pd-t-70 pd-lg-t-20 pd-lg-x-15 pd-x-80 w-100 auth-media">
          <LoginImage />
        </div>
      </div>
    </div>
  );
};

export default RegisterScene;
