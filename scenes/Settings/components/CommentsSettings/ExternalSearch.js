import React, { useState, useEffect } from "react";

const ExternalSearch = ({ defaultSearch, updateSearch }) => {
  const [searchOption, setSearchOption] = useState(defaultSearch || "0");

  useEffect(() => {
    setSearchOption(defaultSearch);
  }, [defaultSearch]);

  return (
    <div className="col-12 mb-1 mt-1">
      <div>
        <label className="bp3-label" htmlFor="defaultSearchOption">
          Update external search results source for comments:
          <select
            className="form-control"
            id="defaultSearchOption"
            value={searchOption}
            onChange={e => setSearchOption(e.target.value)}
          >
            <option value="0">Global</option>
            <option value="1">Only from the current selected host</option>
            <option value="2">Only from hosts that belong to this account</option>
          </select>
        </label>
        <button className="btn-primary btn-fill tx-16" onClick={() => updateSearch(searchOption)}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ExternalSearch;
