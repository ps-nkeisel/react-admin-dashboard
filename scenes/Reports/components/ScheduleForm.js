import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Icon } from 'evergreen-ui';
import { Collapse, Button } from "@blueprintjs/core";
import { TimezonePicker } from "@blueprintjs/timezone";
import { TimePicker } from "@blueprintjs/datetime";
import { toaster } from "evergreen-ui";
import customStyles from "../../commonSettings";
import DataTable from 'react-data-table-component';
import moment from 'moment';
import _ from 'lodash';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faClock, faCaretDown, faTimes } from "@fortawesome/pro-solid-svg-icons";

import {
  updateSchedule, 
  deleteSchedule,
  getLogs,
  runManually,
} from "@/services/api/report";
import {
  loadSchedules, 
} from "@/services/actions/report";

import {
  cronjobAPI, 
} from '../constants';

const columns = [
  {
    name: 'Status',
    cell: row => (
      <>
      { row.result.status == 0 ?
        <Icon icon="tick-circle" color="success" />
      :
        <Icon icon="cross" color="danger" />
      }
      </>
    ),
    sortable: true,
    center: false,
    maxWidth: "64px",
    minWidth: "64px",
    className: 'status',
  },{
    name: 'Start Time',
    selector: 'startTime',
    compact: true,
    cell: row => (
      <>{ moment.unix(row.startTime).format('YYYY-MM-DD, h:mm A') }</>
    ),
    sortable: true,
    right: true,
  },{
    name: 'Execution Time',
    selector: 'executionTime',
    sortable: false,
    right: true,
    style: {paddingLeft: "0px"}
  },
];

const ScheduleForm = ( props ) => {
  const dispatch = useDispatch();

  const { schedul, selected } = props;

  const sessionStore = useSelector(({ session }) => session);
  const { token } = sessionStore;
  const reportSchedules = [ 'Daily', 'Weekly', 'Monthly' ];
  const reportsTime = [ 'Yesterday', 'Last 7 days', 'Last 30 days', 'Month to date' ];
  const date = new Date();
  date.setHours(19, 0);

  const [schedule, setSchedule] = useState(schedul.schedule);
  const [scheduleFor, setScheduleFor] = useState(schedul.scheduleFor);
  const [timeZone, setTimeZone] = useState(schedul.timeZone);
  const [time, setTime] = useState(schedul.time ? moment.unix(schedul.time).toDate(): date);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState(false);
  const [isLogsShown, setIsLogsShown] = useState(false);

  const onUpdate = async e => {
    e.preventDefault();

    setLoading(1);
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

      await updateSchedule(token, schedul.host, schedul.email, schedul.type, schedule, moment(time).unix(), timeZone, scheduleFor, schedul.cronId, timeParams, schedul.id, schedul.uri);

      toaster.success('A schedule has been updated!');
    } catch (err) {
      setError(true);
      toaster.danger('Error processing your request.');
    } finally {
      setLoading(0);
      setTimeout(() => dispatch(loadSchedules()), 3000);
    }
  }

  const onDelete = async e => {
    e.preventDefault();

    setLoading(2);
    try {
      const success = await deleteSchedule(token, schedul.cronId, cronjobAPI);

      if (success) {
        toaster.success('Schedule has been removed');
      } else {
        toaster.warning("Item doesn't exist, this might be a caching issue. Please, wait a few minutes! If the issue exists please contact support.");
      }
    } catch (err) {
      setError(true);
      toaster.danger('Error processing your request.');
    } finally {
      setLoading(0);
      setTimeout(() => dispatch(loadSchedules()), 3000);
    }
  }

  const onGetLogs = async e => {
    e.preventDefault();

    if (logs.length > 0) {
      setLogs([]);
      return;
    }

    setLoading(3);
    try {
      const responseData = await getLogs(token, schedul.cronId, cronjobAPI);
      const { data } = responseData;
      if (data) {
        setLogs(data);
      }
    } catch (err) {
      setError(true);
      toaster.danger('Error processing your request.');
    } finally {
      setLoading(0);
      setIsLogsShown(true);
    }
  }

  const onRunManually = async e => {
    e.preventDefault();

    setLoading(4);
    try {
      await runManually(token, schedul.cronId, cronjobAPI);

      toaster.success('Request has been sent');
    } catch (err) {
      setError(true);
      toaster.danger('Request has not been sent. Please, contact with support');
    } finally {
      setLoading(0);
    }
  }

  return (
    <div className="vu-users-table__row">
      <div>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center vu-users-table__top">
          <div className="vu-users-table__cell vu-users-table__user mg-b-10 mg-md-b-0">
            <p className="tx-13 mb-1">{ schedul.email }</p>
            <p className="tx-12 tx-color-05 mb-0">{ schedul.host }</p>
          </div>
          <div className="vu-users-table__cell vu-users-table__pages">
            <div className="vu-filter-label">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              Daily for: { reportsTime[schedul.scheduleFor] }
            </div>
          </div>
          <div className="vu-users-table__cell vu-users-table__options">
            <button className="btn btn-edit" onClick={props.onToggle}>
              <FontAwesomeIcon className="mr-1" icon={faEdit} />Edit
            </button>
            <button className="btn btn-alert btn-delete d-md-inline-block" onClick={onDelete} >
              <FontAwesomeIcon
                className="mr-1"
                icon={faTrashAlt}
              />
              Delete
            </button>
          </div>
        </div>
      </div>
      <Collapse isOpen={selected}>
        <div className="vu-users-table__cell-inner justify-content-between d-md-flex">
          <div className="vu-users-table__cell-form-wrapper mb-4 mb-md-0">
            <div className="form-group">
              <label htmlFor="schedule" className="bp3-label mb-1">
                Schedule
              </label>
              <div className="pos-relative custom-select__wrapper custom-select__wrapper--w-100">
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="pos-absolute custom-select__icon tx-color-05"
                />
                <select
                  id="schedule"
                  value={schedule}
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
              <label htmlFor="updRepPeriod" className="bp3-label mb-1">
                Reports period:
              </label>
              <div className="pos-relative custom-select__wrapper custom-select__wrapper--w-100">
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="pos-absolute custom-select__icon tx-color-05"
                />
                <select
                  id="updRepPeriod"
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

          <div className="d-flex flex-wrap d-lg-block justify-content-between">
            <div className="vu-users-table__cell-inner-bw order-2 order-md-1">
              <Button
                type="button"
                loading={loading == 3}
                className="btn bp3-fill bp3-intent-warning"
                onClick={onGetLogs}
              >Logs</Button>
            </div>
            <div className="vu-users-table__cell-inner-bw order-1 order-md-2">
              <Button
                type="button"
                loading={loading == 4}
                className="btn bp3-fill bp3-intent-warning"
                onClick={onRunManually}
              >Run manually</Button>
            </div>
            <div className="vu-users-table__cell-inner-bw order-3">
              <Button 
                type="button" 
                className="btn bp3-fill bp3-intent-alert"
                onClick={onDelete}
              >Delete</Button>
            </div>
            <div className="vu-users-table__cell-inner-bw order-4">
              <Button 
                type="button" 
                appearance="primary"
                loading={loading == 1}
                className="btn bp3-fill bp3-intent-primary"
                onClick={onUpdate}
              >Update</Button>
            </div>
          </div>

          <Modal show={isLogsShown} onHide={() => setIsLogsShown(false)}>
            <Modal.Header className="pd-y-20 pd-x-20 pd-sm-x-20">
              <Modal.Title>Logs</Modal.Title>
              <FontAwesomeIcon onClick={() => setIsLogsShown(false)} icon={faTimes} className="svg-inline--fa fa-w-18"></FontAwesomeIcon>
            </Modal.Header>
            <Modal.Body>
              { logs && logs.length > 0 && 
                <div className="border-top">
                  <DataTable
                    customStyles={customStyles}
                    columns={columns}
                    data={logs}
                    noHeader={true}
                    striped={true}
                    dense={true}
                  />
                </div>
              }
              { logs && logs.length === 0 && 
                <p>Logs are empty</p>
              }
            </Modal.Body>
            <Modal.Footer className="pd-x-20 pd-y-15">
            </Modal.Footer>
          </Modal>
        </div>
      </Collapse>
    </div>
  );
};

export default ScheduleForm;
