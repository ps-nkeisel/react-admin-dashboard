import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BulkButtons from "./bulkButtons";
import { Button } from "@blueprintjs/core";

import { fetchModerations } from "@/services/actions/moderation";

const TableFooter = props => {
  const dispatch = useDispatch();
  const { selects } = props;

  const moderationStore = useSelector(({ moderation }) => moderation);
  const { lastfetchCount, pageSize, mod_selects } = moderationStore;

  return (
    <div>
      <div className="border-bottom bg-white pd-15 pos-relative">
        <div className="text-left text-md-center">
          {lastfetchCount == pageSize ? (
            <Button
              loading={moderationStore.loading}
              style={{ fontWeight: 500, letterSpacing: '1px', padding: '10px 25px' }}
              onClick={() => dispatch(fetchModerations())}
              appearance="primary"
              type="button"
              className="bp3-intent-primary rounded-5 tx-16"
            >
              Load More
            </Button>
          ) : (
            <button className="btn btn-warning" disabled>
              No more items
            </button>
          )}
        </div>

        <div className="moderation-table__footer-buttons">
          <BulkButtons />
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
