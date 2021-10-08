import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@blueprintjs/core";
import { TimezonePicker } from "@blueprintjs/timezone";
import { TimePicker } from "@blueprintjs/datetime";
import { toaster } from "evergreen-ui";
import moment from 'moment';
import _ from 'lodash';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/pro-solid-svg-icons";

import {
  addSchedule, 
} from "@/services/api/report";
import {
  loadSchedules, 
} from "@/services/actions/report";

const ReportForm = () => {
  const dispatch = useDispatch();

  const sessionStore = useSelector(({ session }) => session);
  const { user } = sessionStore;

  const { token, isRevenueEnabled } = sessionStore;
  const reportItems = [
    'Analytics Overview',
    ...(isRevenueEnabled ? ['Revenue'] : []),
  ];
  const reportSchedules = [ 'Daily', 'Weekly', 'Monthly' ];
  const siteList = useSelector(({ session }) => session.sites);
  const filterStore = useSelector(({ filter }) => filter);
  const reportsTime = [ 'Yesterday', 'Last 7 days', 'Last 30 days', 'Month to date' ];
  const date = new Date();
  date.setHours(19, 0);

  const [email, setEmail] = useState(user.email);
  const [type, setType] = useState(0);
  const [schedule, setSchedule] = useState(0);
  const [host, setHost] = useState(filterStore.host || siteList[0]);
  const [scheduleFor, setScheduleFor] = useState(0);
  const [timeZone, setTimeZone] = useState('UTC');
  const [time, setTime] = useState(date);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    try {
      let timeParams =
        '&minute=' +
        [moment(time).format('mm')] +
        '&hour=' +
        [moment(time).format('HH')] +
        '&second=0';
      if (schedule === 0) {
        timeParams += '&day=' + _.range(1, 32) + '&weekday=' + _.range(1, 8) + '&month=' + _.range(1, 13);
      } else if (schedule === 1) {
        timeParams += '&day=' + _.range(1, 32) + '&weekday=' + [1] + '&month=' + _.range(1, 13);
      } else if (schedule === 2) {
        timeParams += '&day=' + [1] + '&weekday=' + _.range(1, 8) + '&month=' + _.range(1, 13);
      }

      await addSchedule(token, host, email, schedule, moment(time).unix(), '', timeZone, type, scheduleFor, timeParams, 'http://admin.com');

      toaster.success('A schedule has been added');

      setTimeout(() => dispatch(loadSchedules()), 3000);
    } catch (err) {
      setError(true);
      if (err.message == 'already_exists') {
        toaster.danger('Report already exists');
      } else {
        toaster.danger('Error processing your request.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="bp3-label mb-1">
          Your email:
        </label>
        <input type="email" id="email" className="form-control" placeholder="Enter your email..."
          required pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="repToRecieve" className="bp3-label mb-1">
          Reports to receive:
        </label>
        <div className="pos-relative custom-select__wrapper custom-select__wrapper--w-100">
          <FontAwesomeIcon
            icon={faCaretDown}
            className="pos-absolute custom-select__icon tx-color-05"
          />
          <select
            value={type}
            id="repToRecieve"
            onChange={event => setType(event.target.value)}
            className="d-block w-100 custom-select custom-select--large mg-b--3 tx-16"
          >
          { reportItems.map((item, index) => 
            <option key={index} value={index}>{ item }</option>
          ) }
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="repSchedule" className="bp3-label mb-1">
          Reports schedule:
        </label>
        <div className="pos-relative custom-select__wrapper custom-select__wrapper--w-100">
          <FontAwesomeIcon
            icon={faCaretDown}
            className="pos-absolute custom-select__icon tx-color-05"
          />
          <select
            value={schedule}
            id="repSchedule"
            onChange={event => setSchedule(event.target.value)}
            className="d-block w-100 custom-select custom-select--large tx-16 mg-b--3"
          >
          { reportSchedules.map((item, index) => 
            <option key={index} value={index}>{ item }</option>
          ) }
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="repFor" className="bp3-label mb-1">
          Reports for:
        </label>
        <div className="pos-relative custom-select__wrapper custom-select__wrapper--w-100">
          <FontAwesomeIcon
            icon={faCaretDown}
            className="pos-absolute custom-select__icon tx-color-05"
          />
          <select
            value={host}
            id="repFor"
            onChange={event => setHost(event.target.value)}
            className="d-block w-100 custom-select custom-select--large tx-16 mg-b--3"
          >
          { siteList.map((item, index) => 
            <option key={index} value={item}>{ item }</option>
          ) }
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="repPeriod" className="bp3-label mb-1">
          Reports period:
        </label>

        <div className="pos-relative custom-select__wrapper custom-select__wrapper--w-100">
          <FontAwesomeIcon
            icon={faCaretDown}
            className="pos-absolute custom-select__icon tx-color-05"
          />

          <select
            id="repPeriod"
            value={scheduleFor}
            onChange={event => setScheduleFor(event.target.value)}
            className="d-block w-100 custom-select custom-select--large tx-16 mg-b--3"
          >
          { reportsTime.map((item, index) => 
            <option key={index} value={index}>{ item }</option>
          ) }
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="d-flex timezone-time-wrapper">
          <div className="w-100">
            <label className="bp3-label mb-1">
              Timezone
            </label>   
            <div className="pos-relative custom-select__wrapper">
              <FontAwesomeIcon
                icon={faCaretDown}
                className="pos-absolute custom-select__icon tx-color-05"
              />
              <TimezonePicker
                value={timeZone}
                onChange={tz => setTimeZone(tz)}
                className="w-100 custom-select custom-select--large bd mg-b--3"
              />
            </div>
          </div>
          <div>
            <label className="bp3-label mb-1">
              Receiving time
            </label>
            <TimePicker
              value={time}
              onChange={t => setTime(t)}
              showArrowButtons={false}
              className="w-100 custom-timezone"
            />
          </div>

        </div>

      </div>

      <Button type="submit" intent="null" className="btn-primary btn-fill tx-16 com-widget__btn mb-4" fill={true}
        loading={loading}
      >Submit</Button>
    </form>
  );
};

export default ReportForm;
