import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import AuthProtectedPage from "@/HOC/withAuthProtection";
import HomeLayout from "@/layouts/HomeLayout";
import SitesListScene from "@/scenes/SitesList";

import { updateTitle } from '@/services/actions/session';

const SitesListPage = () => {
  const dispatch = useDispatch();
  const pageTitle = useSelector(({ session }) => session.title);
  if (pageTitle !== 'Vuukle Dashboard') {
    dispatch(updateTitle('Vuukle Dashboard'));
  }

  return (
    <HomeLayout>
      <SitesListScene />
    </HomeLayout>
  );
};

export default AuthProtectedPage(SitesListPage, false);
