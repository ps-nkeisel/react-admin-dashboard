import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Cookies from "js-cookie";
import LoadingOverlay from "react-loading-overlay";

import Loader from "@/components/Loader";

import { 
  saveToken, 
  removeToken, 
  saveUrl, 
} from "@/services/actions/session";

export const AuthProtectedPage = (Child, loaderEnabled = true) => {
  const PageWrapper = props => {
    const dispatch = useDispatch();

    const sessionStore = useSelector(({ session }) => session);
    const token = Cookies.get("token");

    const { loading, error } = sessionStore;

    useEffect(() => {
      if (!token) {
        dispatch(saveUrl(window.location.pathname + window.location.search));
      }
    }, []);

    useEffect(() => {
      // If user has no token
      if (!token) {
        Router.replace("/login");
      }

      // if token exists but not in the store
      if (token && !sessionStore.token) {
        dispatch(saveToken(token));
      }
    }, [token]);

    // If we have changes in our site then we need to redirect
    useEffect(() => {
      if (error) {
        dispatch(removeToken());
        dispatch(saveUrl(window.location.href));
        Router.replace("/login");
      }
    }, [error]);

    // If token exists and matches cookie
    if (sessionStore.token && token === sessionStore.token && sessionStore.apiKey) {
      return (
        <LoadingOverlay active={loading && loaderEnabled} spinner={<Loader />}>
          <Child {...props} />
        </LoadingOverlay>
      )
    }

    return <></>;
  };

  return PageWrapper;
};

export default AuthProtectedPage;
