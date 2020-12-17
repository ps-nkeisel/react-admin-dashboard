import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faSearch
} from "@fortawesome/pro-solid-svg-icons";

import {
  updateSearchParam,
} from "@/services/actions/moderation";

const ModerationSearch = () => {
  const dispatch = useDispatch();

  const moderationStore = useSelector(({ moderation }) => moderation);
  const { search_param } = moderationStore;
  const [search, setSearch] = useState(search_param);

  useEffect(() => {
    setSearch(search_param);
  }, [search_param]);

  return (
    <div className="d-flex tx-13 moderation-search">
      <div className="moderation-filters__item moderation-filters__item--search">
        <input type="search" className="form-control" placeholder="Key word" 
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              dispatch(updateSearchParam(search));
            }
          }}
        />
        <button className="btn">
          <FontAwesomeIcon
            icon={faSearch}
            className="svg-inline--fa fa-w-18"
            onClick={() => dispatch(updateSearchParam(search))}
          ></FontAwesomeIcon>
        </button>
      </div>
      {/* <button className="btn btn-sm btn-primary mr-1"
        onClick={() => doSearch(search)}
      >
        Search
      </button> */}
    </div>
  );
}

export default ModerationSearch;
