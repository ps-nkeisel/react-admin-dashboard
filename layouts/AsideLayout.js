import React from 'react';

import PageTitle from './PageTitle';
import Aside from './Aside';
import Footer from './Footer';

const AsideLayout = ({ children }) => (
  <div className="d-flex flex-column ht-100v">
    <PageTitle />
    <Aside />
    <div className="content ht-100v pd-0 d-flex flex-column">
      {children}
      <Footer />
    </div>
  </div>
);

export default AsideLayout;
