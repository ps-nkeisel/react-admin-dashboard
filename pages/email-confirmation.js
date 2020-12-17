import React from "react";
import { useDispatch } from 'react-redux';

import DefaultLayout from "@/layouts/DefaultLayout";
import EmailConfirmationScene from "@/scenes/EmailConfirmation";

import { updateTitle } from '@/services/actions/session';

const EmailConfirmationPage = () => {
  const dispatch = useDispatch();
  dispatch(updateTitle('Confirm Email'));

  return (
    <DefaultLayout>
      <EmailConfirmationScene />
    </DefaultLayout>
  );
};

export default EmailConfirmationPage;
