import React, { useState, useEffect } from "react";

const DefaultSorting = ({ defaultSorting, updateSorting }) => {
  const [sortingOption, setSortingOption] = useState(defaultSorting || "0");

  useEffect(() => {
    setSortingOption(defaultSorting);
  }, [defaultSorting]);

  return (
    <div className="col-12 mb-1 mt-1">
      <div>
        <label className="bp3-label" htmlFor="defaultSortingSelect">
          Default sorting option for comments:
          <select
            className="form-control"
            id="defaultSortingSelect"
            value={sortingOption}
            onChange={e => setSortingOption(e.target.value)}
          >
            <option value="0">Latest</option>
            <option value="1">Best</option>
            <option value="2">Oldest</option>
            <option value="4">Most Replied</option>
          </select>
        </label>
        <button
          className="btn-primary btn-fill tx-16"
          onClick={() => updateSorting(sortingOption)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default DefaultSorting;
