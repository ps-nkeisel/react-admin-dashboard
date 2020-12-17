import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/pro-solid-svg-icons";

import { kmFormat } from "@/utils";
import { updateTitle } from '@/services/actions/session';

const OnlineUsersContainer = () => {
  const OnlineCount = useSelector(({ realtime }) => realtime.OnlineCount);
  const dispatch = useDispatch();
  const [oc, setOc] = useState(0);
  const [ocMin, setOcMin] = useState(0);
  const [ocMax, setOcMax] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [series, setSeries] = useState([]);
  const [percentage, setPers] = useState(0);

  useEffect(() => {
    if (OnlineCount > oc ) {
      setGrowth(1);
    } else if (OnlineCount < oc) {
      setGrowth(-1);
    } else {
      setGrowth(0);
    }
    setOc(OnlineCount);

    let ocmin = ocMin;
    let ocmax = ocMax;
    if (ocMin == 0 && ocMax == 0) {
      ocmin = Math.round(OnlineCount / 1.05);
      setOcMin(ocmin);
      ocmax = Math.round(OnlineCount * 1.1);
      setOcMax(ocmax);
    } else if (OnlineCount < ocMin) {
      ocmin = OnlineCount;
      setOcMin(ocmin);
    } else if (OnlineCount > ocMax) {
      ocmax = OnlineCount;
      setOcMax(ocmax);
    }

    const ocVal = Math.round((OnlineCount - ocmin) * 100 / (ocmax - ocmin || 1));
    setSeries([ocVal]);

    const pers = Math.abs((100 / oc) * (oc - OnlineCount)).toFixed(1);
    setPers(pers);

    dispatch(updateTitle(`Realtime - ${OnlineCount} Users`));

  }, [OnlineCount]);

  const renderPercentage = () => {
    return (
     <span>{percentage === 'Infinity' ? 0 : percentage}%</span>
    );
  }

  const renderGrowth = () => {
    if (growth == 1) {
      return (<div style={{color: '#10B16D'}}>
        {renderPercentage()}
        <span className="ml-1">↑</span>
      </div>);
    } else if (growth == -1) {
      return (<div style={{color: '#FF9684'}} >
        {renderPercentage()}
        <span className="ml-1">↓</span>
      </div>);
      return 
    } else {
      return (<div style={{color: '#10B16D'}}>
        {renderPercentage()}
        <span className="ml-1">-</span>
      </div>);
    }
  }

  return (
    <div className="analytic-info-card d-flex users-card align-items-lg-center flex-column flex-lg-row pd-lg-t-20 pd-lg-b-20">
      <div className="analytic-info-card__icon pink flex-shrink-0 mg-r-15 mg-b-15 mg-lg-b-5">
        <div className="analytic-info-card__icon-inner">
          <FontAwesomeIcon icon={faUsers} />
        </div>
      </div>
      <div className="d-flex">
      <div>
        <h6 className="analytic-info-card__title mg-b-7">Users</h6>
        <div className="analytic-info-card__numbers mb-0">
          {kmFormat.format(OnlineCount)}
        </div>
      </div>
      <div className="analytic-info-card__users-percents">
        <div className="percent">
          {renderGrowth()}
        </div>
        <img src="/static/images/users-chart-line.svg" />
      </div>
      </div>
    </div>
  );
}

export default OnlineUsersContainer;
