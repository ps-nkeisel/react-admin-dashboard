import React from "react";
import { useDispatch } from 'react-redux';

import DefaultLayout from "@/layouts/DefaultLayout";
import LoginScene from "@/scenes/Login";

import { updateTitle } from '@/services/actions/session';

const Login = () => {
  const dispatch = useDispatch();
  dispatch(updateTitle('Login to Dashboard'));
  
  return (
    <DefaultLayout>
      <LoginScene />
    </DefaultLayout>
  );
};

export default Login;
