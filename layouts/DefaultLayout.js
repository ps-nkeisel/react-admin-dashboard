import React from 'react';
import PropTypes from 'prop-types';

import PageTitle from './PageTitle';
import Footer from './Footer'

const DefaultLayout = ({ children }) => (
  <div className="d-flex flex-column">
    <PageTitle />
    <main className="mt-lg-auto mb-auto pd-lg-t-100 pd-lg-b-70 pd-y-50">
      {children}
    </main>
    <div className="d-none d-lg-block">
      <div className="text-center">
        <a href="/" className="d-inline-block auth-logo large-logo">
          <img
            src="/static/images/logo.svg"
            alt="Admin Logo"
            className="w-100"
          />
        </a>
      </div>
      <Footer className="footer justify-content-center d-flex pd-t-0-f" />
    </div>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default DefaultLayout;
