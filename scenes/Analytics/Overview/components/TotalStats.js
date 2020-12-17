import React from "react";
import { useSelector } from "react-redux";
import {
  faEye,
  faComments,
  faShareAlt,
  faSmile,
  faHeartCircle,
  faSortCircle,
  faThumbsUp,
  faUsersMedical
} from "@fortawesome/pro-solid-svg-icons";

import StatBox from "@/components/StatBox";
import { num2percent } from "@/utils";

const TotalStats = () => {
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { daily_site_stats, daily_site_stats_loading } = analyticsStore.index;
  const pageViews = daily_site_stats.reduce((sum, item) => sum + item.pageViews, 0);
  const comments = daily_site_stats.reduce((sum, item) => sum + item.comments, 0);
  const shares = daily_site_stats.reduce((sum, item) => sum + item.shares, 0);
  const emotes = daily_site_stats.reduce((sum, item) => sum + item.emotes, 0);
  const recommends = daily_site_stats.reduce((sum, item) => sum + item.recommends, 0);
  const votes = daily_site_stats.reduce((sum, item) => sum + item.votes, 0);
  const newSessions = daily_site_stats.reduce((sum, item) => sum + item.refCount, 0);

  const stats = {
    pageViews: pageViews,
    comments: comments,
    shares: shares,
    emotes: emotes,
    recommends: recommends,
    viewability: daily_site_stats.length > 0 ? num2percent(daily_site_stats.reduce((a, b) => a + (b.pageViews > 0 ? b.commentViews / b.pageViews : 0), 0) / daily_site_stats.length, 1) : '0%',
    votes: votes,
    newSessions: newSessions,
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h6 className="mg-b-15 tx-20 tx-normal tx-spacing-1">
            All sites stats
          </h6>
          <div className="row mg-x--5">
            <StatBox loading={daily_site_stats_loading} name="Page Views" value={stats.pageViews} icon={faEye} iconColor="bg-ui-08" borderColor="bd-ui-08-2" />
            <StatBox loading={daily_site_stats_loading} name="Comments" value={stats.comments} icon={faComments} iconColor="bg-ui-09" borderColor="bd-ui-09-2" />
            {/* <StatBox loading={daily_site_stats_loading} name="Pending Comments" value={stats.pendingComments} icon={faHourglassHalf} iconColor="bg-ui-10" borderColor="bd-ui-10-2" /> */}
            <StatBox loading={daily_site_stats_loading} name="Shares" value={stats.shares} icon={faShareAlt} iconColor="bg-ui-11" borderColor="bd-ui-11-2" />
            <StatBox loading={daily_site_stats_loading} name="Emotes" value={stats.emotes} icon={faSmile} iconColor="bg-ui-12" borderColor="bd-ui-12-2" />
            <StatBox loading={daily_site_stats_loading} name="Recommendations" value={stats.recommends} icon={faHeartCircle} iconColor="bg-ui-13" borderColor="bd-ui-13-2" />
            <StatBox loading={daily_site_stats_loading} name="Comment Viewability" value={stats.viewability} icon={faSortCircle} iconColor="bg-ui-11" borderColor="bd-ui-11-2" />
            <StatBox loading={daily_site_stats_loading} name="votes" value={stats.votes} icon={faThumbsUp} iconColor="bg-ui-15" borderColor="bd-ui-15-2" />
            <StatBox loading={daily_site_stats_loading} name="New Sessions" value={stats.newSessions} icon={faUsersMedical} iconColor="bg-ui-16" borderColor="bd-ui-16-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalStats;
