import React from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import ChangePasswordScene from "@/scenes/ChangePassword";
import { useDispatch } from 'react-redux';
import { updateTitle } from '@/services/actions/session';

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  dispatch(updateTitle('Change Password'));

  return (
    <DefaultLayout>
      <ChangePasswordScene />
    </DefaultLayout>
  );
};

export default ChangePasswordPage;
