import React, { useState } from "react";
import { useRouter } from "next/router";
import { toaster } from "evergreen-ui";

import ChangePasswordForm from "./components/ChangePasswordForm";

import { resetPasswordByKey } from "@/services/api/auth";
import { setTokenCookie } from "@/utils";

const RecoverPassword = () => {
  const router = useRouter();

  const { query } = router;
  const resetKey = query.code;

  const [email, setEmail] = useState(query.email || "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    e.persist(); // persist event to be able to access the currentTarget

    const passwordIsShort = password.length < 6 || repeatPassword.length < 6;
    const passwordsDontMatch = password !== repeatPassword;

    setLoading(true);

    // Checks validity of email, since it uses a pattern regex
    if(!e.currentTarget[0].validity.valid) {
      toaster.danger("Your email is invalid", {
        description: "Please make sure the email is valid"
      });
      setLoading(false);
      return;
    }

    if (passwordIsShort) {
      toaster.danger("Your password is shorter than 6 characters", {
        description: "Please type a longer password"
      });
      setLoading(false);
      return;
    }

    if (passwordsDontMatch) {
      toaster.danger("Your password and re-typed password don't match", {
        description: "Please type the same password in both fields"
      });
      setLoading(false);
      return;
    }

    if (!resetKey) {
      toaster.danger("Your password reset key isn't valid", {
        description:
          "Please check your inbox to make sure you have followed the link in the latest email or request a new password recovery email message"
      });
      setLoading(false);
      return;
    }

    try {
      const token = await resetPasswordByKey(email, "", password, resetKey);
      setTokenCookie(token);
      toaster.success("Your password is successfully changed!", {
        description: "You will be redirected to the main page shortly"
      });
      setTimeout(() => router.replace("/"), Math.random() * 3 * 1000);
    } catch (err) {
      toaster.danger(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-auth">
      <div className="d-flex ht-100p justify-content-center">
        <div className="sign-wrapper pd-x-15 pd-lg-x-50 pd-xl-x-65 pd-lg-t-20 pd-lg-b-0 pd-y-10 w-100">
          <div className="text-center text-lg-left mg-lg-b-65 mg-b-30">
            <a href="/" className="d-inline-block auth-logo small-logo">
              <img
                src="/static/images/logo.svg"
                alt="Admin Logo"
                className="w-100"
              />
            </a>
          </div>
          <h4 className="tx-color-01 mg-b-5 tx-30 tx-bold">
            Change your password
          </h4>
          <ChangePasswordForm
            onSubmit={onSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            loading={loading}
          />
        </div>
        <div
          className="media-body d-none d-lg-block"
          style={{
            backgroundImage: "url(/static/images/register-image.jpg)"
          }}
        ></div>
      </div>
    </div>
  );
};

export default RecoverPassword;
