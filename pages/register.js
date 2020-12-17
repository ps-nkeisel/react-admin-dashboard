import React from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import RegisterScene from "@/scenes/Register";
import { useDispatch } from 'react-redux';
import { updateTitle } from '@/services/actions/session';

const RegisterPage = () => {
  const dispatch = useDispatch();
  dispatch(updateTitle('Register a new account'));
  
  return (
    <DefaultLayout>
      <RegisterScene />
    </DefaultLayout>
  );
};

export default RegisterPage;
