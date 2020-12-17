import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { updateEmote } from "@/services/actions/analytics/emotes";
import { num2percent } from "@/utils";

const EmoteContainer = props => {
  const router = useRouter();
  const pathname = router.pathname;
  let query = router.query;

  const { type, percentage, count, index } = props;
  const dispatch = useDispatch();
  const { emote } = useSelector(({ analytics }) => analytics.emotes);

  return (
    <>
      <div
        onClick={() => {
          dispatch(updateEmote(index+1));
          query.subtab = index+1;
          router.replace({ pathname, query });      
        }}
        className={`d-flex align-items-lg-center pd-x-15 pd-t-20 pd-b-20 rounded-4 flex-column flex-lg-row emote-stats__item ${
          index + 1 == emote ? "bg-brand-01" : "bg-white"
        }`}
      >
        <div className="mg-r-15 mg-b-15 mg-lg-b-5 ht-lg-60 flex-shrink-0 flex-basis-30p mx-wd-60">
          <img
            className="ht-100p wd-100p d-inline-block"
            src={`/static/images/smiles/smile-${type.toLowerCase()}.svg`}
          />
        </div>
        <div>
          <h6
            className={`tx-uppercase tx-semibold mg-b-7 tx-10 tx-spacing-1
            ${index + 1 == emote ? "tx-white" : "tx-color-05"}
          `}
          >
            {type} {num2percent(percentage, 0)}
          </h6>
          <h2
            className={`mb-0 tx-normal tx-spacing-2 tx-30
            ${index + 1 == emote ? "tx-white" : ""}
          `}
          >
            {count}
          </h2>
        </div>
      </div>
    </>
  );
};

EmoteContainer.propTypes = {
  type: PropTypes.string,
  percentage: PropTypes.number,
  count: PropTypes.number,
  index: PropTypes.number
};

export default EmoteContainer;
