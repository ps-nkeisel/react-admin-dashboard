import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronSquareUp,
  faChevronSquareDown
} from "@fortawesome/pro-solid-svg-icons";

const ToTCount = ({ updateTot, defaultTotCount }) => {
  const [totCount, setTotCount] = useState(defaultTotCount);

  useEffect(() => {
    setTotCount(defaultTotCount);
  }, [defaultTotCount]);

  return (
    <div className="col-12 mb-1 mt-1">
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-group form-group--number">
          <label className="bp3-label" htmlFor="totCount">
            Talk Of Town default article count:
            <div className="pos-relative mg-t-2">
              <input
                type="number"
                className="form-control mg-t-0"
                id="totCount"
                value={totCount}
                min={0}
                max={12}
                onChange={e => setTotCount(e.target.value)}
                onKeyDown={event => {
                  if (event.key === "Enter") {
                    updateTot(totCount, event);
                  }
                }}
                placeholder="Enter the default talk of town article count"
                required
              />
              <div className="num-controls d-flex flex-column">
                <button
                  className="num-controls__btn tx-color-08"
                  onClick={() => totCount < 12 && setTotCount(parseInt(totCount) + 1)}
                >
                  <FontAwesomeIcon icon={faChevronSquareUp} />
                </button>
                <button
                  className="num-controls__btn tx-color-08"
                  onClick={() =>
                    totCount > 0 && setTotCount(parseInt(totCount) - 1)
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
            disabled={typeof totCount === "number" && (totCount < 0 || totCount > 12)}
            onClick={() => updateTot(totCount)}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToTCount;
