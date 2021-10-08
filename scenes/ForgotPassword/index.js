import React, { useState } from "react";
import Link from "next/link";
import { toaster } from "evergreen-ui";

import ForgotPasswordForm from "./components/ForgotPasswordForm";

import { recoverPasswordAPI } from "@/services/api/auth";
import { randomHashCode, hashCode } from "@/utils";
import LoginImage from '@/static/images/login';

const RegisterScene = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const r = randomHashCode(email);
    const s = hashCode(email);
    try {
      await recoverPasswordAPI(email, r, s, "dashboard");
      toaster.notify(`Recovery link has been sent to:  ${email}`);
      setEmail("");
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
            </div>            <h4 className="tx-color-01 mg-b-5 tx-24 tx-semibold">
              Recover your password
            </h4>
            <ForgotPasswordForm
              onSubmit={onSubmit}
              email={email}
              setEmail={setEmail}
              loading={loading}
            />
            <div className="tx-14 mg-t-20 tx-center">
              <Link href="/login" prefetch={false}>
                <a>Back to Log In</a>
              </Link>
            </div>
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
