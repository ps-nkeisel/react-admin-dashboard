import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pane, Text, Select } from "evergreen-ui";
import { Row, Col } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import Loader from "@/components/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/pro-solid-svg-icons";

import SchedulesListForm from "./ScheduleForm";

import { loadSchedules } from "@/services/actions/report";
import { containsFilter } from "@/utils";

const SchedulesListContainer = () => {
  const dispatch = useDispatch();

  const sessionStore = useSelector(({ session }) => session);
  const { isRevenueEnabled } = sessionStore;
  const reportItems = [
    "Analytics Overview",
    ...(isRevenueEnabled ? ["Revenue"] : [])
  ];
  const reportStore = useSelector(({ report }) => report);
  const { schedules, schedules_loading } = reportStore;

  const [search, setSearch] = useState("");
  const [type, setType] = useState(0);
  const [selectID, setSelectID] = useState(0);

  useEffect(() => {
    dispatch(loadSchedules());
  }, []);

  const filteredItems = schedules.filter(
    item => item.type == type && containsFilter(item, search)
  );

  return (
    <LoadingOverlay
      active={schedules_loading}
      spinner={<Loader />}
    >
      <div className="vu-reports-table">
        <h3 className="tx-20 tx-spacing-1 mg-b-2">Schedules list</h3>
        <p
          style={{ marginBottom: "12px" }}
          className="d-flex tx-16 tx-color-05"
        >
          Total count: {schedules.length}
        </p>

        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start">
          <div className="pos-relative w-100 order-2 order-lg-1" style={{ marginBottom: "12px" }}>
            <input
              className="search-input outline-none"
              placeholder="Search Schedule"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="pos-absolute" />
          </div>
          <div className="pos-relative order-1 order-lg-2 custom-select__wrapper vu-reports-table__select-wrapper">
            <FontAwesomeIcon
              icon={faCaretDown}
              className="pos-absolute custom-select__icon tx-color-05"
            />
            <select
              value={type}
              onChange={event => setType(event.target.value)}
              className="d-block w-100 custom-select tx-13"
            >
              {reportItems.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="vu-users-table">
          <div className="vu-users-table__header vu-users-table__row d-flex tx-color-05">
            <div className="vu-users-table__cell vu-users-table__user">
              <span>USER</span>
            </div>
            <div className="vu-users-table__cell vu-users-table__pages">
              <span>REPORTS SCHEDULE</span>
            </div>
            <div className="vu-users-table__cell vu-users-table__options">
              <span>OPTIONS</span>
            </div>
          </div>
          {filteredItems.map(item => (
            <SchedulesListForm
              key={item.id}
              schedul={item}
              selected={selectID == item.id}
              onToggle={() => {
                if (selectID == item.id) {
                  setSelectID(0);
                } else {
                  setSelectID(item.id);
                }
              }}
            />
          ))}
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default SchedulesListContainer;
