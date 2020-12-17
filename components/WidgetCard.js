import React from "react";
import PropTypes from "prop-types";
import Loader from "@/components/Loader";

/**
 * This component is used as a wrapper for widgets (charts, tables etc.)
 * TODO: based on dashforge example add acitons on right side: reload, dropdown with export etc.. (explore old dashboard)
 */
const CardHeader = ({ title, onRefresh, ...props }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-between"
      {...props}
    >
      {title && (
        <h6 className="mg-b-15 tx-20 tx-normal tx-spacing-1">{title}</h6>
      )}
    </div>
  );
};

const CardLoader = () => {
  return (
    <div className="px-3 p-5">
      <Loader />
    </div>
  );
};

const WidgetCard = ({
  title,
  onRefresh,
  children,
  darkerHeader,
  loading,
  className
}) => {
  return (
    <div className={`${className}`}>
      {title || onRefresh ? (
        <CardHeader
          onRefresh={onRefresh}
          title={title}
          style={darkerHeader ? { background: "#f5f6fa" } : {}}
        />
      ) : null}
      {loading ? <Loader /> : children}
    </div>
  );
};

WidgetCard.defaultProps = {
  loading: false,
  darkerHeader: false,
  className: ""
};

WidgetCard.propTypes = {
  title: PropTypes.string,
  onRefresh: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  loading: PropTypes.bool,
  darkerHeader: PropTypes.bool
};

export default WidgetCard;
