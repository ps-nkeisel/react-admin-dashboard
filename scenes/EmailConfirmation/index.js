import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { confirmPublisherEmail } from "@/services/api/auth";
import Loader from "@/components/Loader";

import "./styles/index.scss";

const EmailConfirmationScene = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [loading, setLoading] = useState(true);
  const { query } = router;
  const { emailConfirmKey, host } = query;
  const invalidLink = !emailConfirmKey || !host;

  useEffect(() => {
    if (invalidLink) {
      /** 
       * During the first execution the router doesn't have the query params.
       * So at first we're going to ignore the error, then set firstRun to false 
       * so useEffect runs a second time to confirm that the link is indeed invalid
       * if it is invalid.
       **/
      if (firstRun) {
        setFirstRun(false);
      } else {
        setError(true);
        setLoading(false);
      }
      return;
    }

    (async () => {
      try {
        await confirmPublisherEmail(emailConfirmKey, host);
        setTimeout(() => router.replace("/"), 1500);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
        setError(false);
      }
    })();
  }, [firstRun, query]);

  const renderDetail = () => {
    if (loading) {
      return <Loader />;
    } else {
      if (invalidLink) {
        return (
          <>
            <img src="/static/images/email-invalid.svg" />
            <h6 className="tx-color-07 mb-4 tx-14 email-confirm__title">
              Confirmation link is not valid
            </h6>
          </>
        );
      } else if (error) {
        return (
          <>
            <img src="/static/images/email-invalid.svg" />
            <h6 className="tx-color-07 mb-4 tx-14">
              Validation error, please try again. If this error persists, please
              contact the <a href="mailto:support@admin.com">support</a>
            </h6>
          </>
        );
      } else {
        return (
          <>
            <img src="/static/images/email-valid.svg" />
            <h6 className="tx-color-07 mb-4 tx-14 email-confirm__title">
              Success! Your email has been confirmed
            </h6>
          </>
        );
      }
    }
  };

  return (
    <div className="content-auth">
      <div
        className="media-body d-flex ht-100p justify-content-center align-items-center email-confirm"
        style={{ backgroundImage: "url(/static/images/register-image.jpg)" }}
      >
        <div className="text-center email-confirm-wrapper pd-x-15 pd-lg-x-40 pd-lg-t-25 pd-y-25 w-100">
          {renderDetail()}
          <div className="email-confirm__footer d-flex justify-content-between">
            <Link href="/login" prefetch={false}>
              <span>Back to Log In</span>
            </Link>
            <a href="mailto:support@admin.com">
              <span>Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationScene;
