import React from "react"
import { useSelector } from "react-redux"
import {
  faEye,
  faComments,
  faHourglassHalf,
  faShareAlt,
  faSmile,
  faHeartCircle,
  faSortCircle
} from "@fortawesome/pro-solid-svg-icons"

import StatBox from "@/components/StatBox"
import { num2percent } from "@/utils"

const TotalStats = () => {
  const sitesStore = useSelector(({ sites }) => sites)
  const { totalStats, loading, site_stats } = sitesStore
  const commentViewability = site_stats.length > 0 ? num2percent(site_stats.reduce((a, b) => a + (b.pageViews > 0 ? b.commentViews / b.pageViews : 0), 0) / site_stats.length, 1) : '0%'

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h6 className="mg-b-15 tx-20 tx-normal tx-spacing-1">
            All sites stats (Yesterday)
          </h6>
          <div className="row mg-x--5">
            <StatBox loading={loading} name="Page Views" value={totalStats.pageViews} icon={faEye} iconColor="bg-ui-08" borderColor="bd-ui-08-2" />
            <StatBox loading={loading} name="Comments" value={totalStats.comments + totalStats.replies} icon={faComments} iconColor="bg-ui-09" borderColor="bd-ui-09-2" />
            <StatBox loading={loading} name="Pending Comments" value={totalStats.pendingComments} icon={faHourglassHalf} iconColor="bg-ui-10" borderColor="bd-ui-10-2" />
            <StatBox loading={loading} name="Shares" value={totalStats.shares} icon={faShareAlt} iconColor="bg-ui-11" borderColor="bd-ui-11-2" />
            <StatBox loading={loading} name="Emotes" value={totalStats.emotes} icon={faSmile} iconColor="bg-ui-12" borderColor="bd-ui-12-2" />
            <StatBox loading={loading} name="Comment Viewability" value={commentViewability} icon={faSortCircle} iconColor="bg-ui-15" borderColor="bd-ui-15-2" />
            <StatBox loading={loading} name="Recommendations" value={totalStats.recommendations} icon={faHeartCircle} iconColor="bg-ui-13" borderColor="bd-ui-13-2" />
          </div>
        </div>
      </div>
    </>
  )
}

export default TotalStats
