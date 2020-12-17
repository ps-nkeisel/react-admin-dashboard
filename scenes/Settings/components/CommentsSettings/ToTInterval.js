import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronSquareUp,
  faChevronSquareDown
} from "@fortawesome/pro-solid-svg-icons";

const ToTInterval = ({ updateTotInterval, defaultTotInterval }) => {
  const [totIntervalCount, setTotIntervalCount] = useState(defaultTotInterval);

  useEffect(() => {
    setTotIntervalCount(defaultTotInterval);
  }, [defaultTotInterval]);

  return (
    <div className="col-12 mb-1 mt-1">
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-group form-group--number">
          <label className="bp3-label" htmlFor="totIntervalCount">
            Talk Of Town default interval count(days):
            <div className="pos-relative mg-t-2">
              <input
                type="number"
                className="form-control mg-t-0"
                id="totIntervalCount"
                value={totIntervalCount}
                min={0}
                max={12}
                onChange={e => setTotIntervalCount(e.target.value)}
                onKeyDown={event => {
                  if (event.key === "Enter") {
                    updateTotInterval(totIntervalCount, event);
                  }
                }}
                placeholder="Enter the default talk of town day interval count"
                required
              />
              <div className="num-controls d-flex flex-column">
                <button
                  className="num-controls__btn tx-color-08"
                  onClick={() =>
                    totIntervalCount < 12 &&
                    setTotIntervalCount(parseInt(totIntervalCount) + 1)
                  }
                >
                  <FontAwesomeIcon icon={faChevronSquareUp} />
                </button>
                <button
                  className="num-controls__btn tx-color-08"
                  onClick={() =>
                    totIntervalCount > 0 &&
                    setTotIntervalCount(parseInt(totIntervalCount) - 1)
                  }
                >
                  <FontAwesomeIcon icon={faChevronSquareDown} />
                </button>
              </div>
            </div>
          </label>
        </div>
        <div>
          <button
            className="btn-primary btn-fill tx-16"
            disabled={
              typeof totIntervalCount === "number" &&
              (totIntervalCount < 0 || totIntervalCount > 12)
            }
            onClick={() => updateTotInterval(totIntervalCount)}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToTInterval;
