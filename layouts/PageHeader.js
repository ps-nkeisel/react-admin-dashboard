import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PageHeader = ({ breadcrumbs, title, children }) => {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <h5>{title}</h5>
          <span className="tx-color-05">
            <Link href="/" prefetch={false}>
              <a className="text-muted mr-1">Home</a>
            </Link>
            {breadcrumbs.map((name, idx) => (
              <span key={idx}>
                <span className="brdcrmbs__separ px-1">></span>
                {name}
              </span>
            ))} 
          </span>
        </nav>
      </div>
      <div>
        {children}
      </div>
    </>
  );
};

PageHeader.defaultProps = {
  breadcrumbs: []
};

PageHeader.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default PageHeader;
