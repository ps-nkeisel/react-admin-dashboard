import React from "react";
import { useDispatch } from 'react-redux';

import DefaultLayout from "@/layouts/DefaultLayout";
import ForgotPasswordScene from "@/scenes/ForgotPassword";

import { updateTitle } from '@/services/actions/session';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  dispatch(updateTitle('Forgot Password'));

  return (
    <DefaultLayout>
      <ForgotPasswordScene />
    </DefaultLayout>
  );
};

export default ForgotPasswordPage;
