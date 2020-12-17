import React from "react";
import PropTypes from "prop-types";

import PageTitle from './PageTitle';
import Header from './HomeHeader';
import Footer from './Footer';

const HomeLayout = ({ children }) => (
  <div className="d-flex flex-column ht-100v">
    <PageTitle />
    <Header />
    <div className="content-body bg-ui-06">
      {children}
    </div>
    <Footer />
  </div>
);

HomeLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default HomeLayout;
