import React from "react";
import { useSelector } from "react-redux";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/pro-solid-svg-icons";
import "bootstrap-daterangepicker/daterangepicker.css";

const DateRange = ({ className, onChange, ranges }) => {
  const filterStore = useSelector(({ filter }) => filter);
  const { dateRange } = filterStore;

  const handleEvent = (event, picker) => {
    const selectedRange = [picker.startDate, picker.endDate];

    if (
      !selectedRange[0].isValid() ||
      !selectedRange[0].isValid() ||
      selectedRange[1].diff(selectedRange[0]) < 0
    ) {
      return;
    }

    if (onChange && typeof onChange === "function") {
      onChange(selectedRange);
    }
  };

  return (
    <div className="pos-relative date-section">
      <DateRangePicker
        className={className}
        ranges={ranges}
        startDate={moment(dateRange[0])}
        endDate={moment(dateRange[1])}
        linkedCalendars={false}
        onApply={handleEvent}
        maxDate={moment()}
      >
        <button className="btn btn-sm date-btn">
          <span className="d-none d-lg-inline-block">
            {moment(dateRange[0]).format("YYYY-MM-DD")} -{" "}
            {moment(dateRange[1]).format("YYYY-MM-DD")}
          </span>
        </button>
      </DateRangePicker>
      <FontAwesomeIcon
        icon={faCalendarAlt}
        className="pos-absolute tx-color-05 t-0 b-0 l-10 my-auto cl-icon"
      />
    </div>
  );
};

DateRange.defaultProps = {
  ranges: {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract("days", 1), moment().subtract("days", 1)],
    "Last 7 days": [moment().subtract("days", 7), moment()],
    "Last 30 days": [moment().subtract("days", 30), moment()],
    "This month": [moment().startOf("month"), moment().endOf("month")]
  }
};

export default DateRange;
