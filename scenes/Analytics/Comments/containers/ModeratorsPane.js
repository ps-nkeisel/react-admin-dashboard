import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSortAlt,
    faCaretDown,
    faRedoAlt
} from "@fortawesome/pro-solid-svg-icons"

import Loader from "@/components/Loader";
import customStyles from "@/scenes/commonSettings";
import { TooltipContainer } from "@/components/Tooltip";

import {
    loadModerators,
    updateModerator,
    loadModeratorCommentStats
} from "@/services/actions/analytics/comments"
import { kmFormat } from "@/utils"

const columns = [
    {
        name: (
            <TooltipContainer className="text-center" tooltip="Date">
                Date
      </TooltipContainer>
        ),
        selector: "date",
        sortable: true,
        maxWidth: "110px"
    },
    {
        name: (
            <TooltipContainer className="text-center" tooltip="Total comments and replies that were approved">
                Approved
      </TooltipContainer>
        ),
        cell: row => kmFormat.format(row.Approved),
        sortable: true,
        center: true
    },
    {
        name: (
            <TooltipContainer className="text-center" tooltip="Total comments and replies that were rejected">
                Rejected
      </TooltipContainer>
        ),
        cell: row => kmFormat.format(row.Rejected),
        sortable: true,
        center: true
    },
    {
        name: (
            <TooltipContainer className="text-center" tooltip="Total comments and replies that are pending">
                Pending
      </TooltipContainer>
        ),
        cell: row => kmFormat.format(row.Pending),
        sortable: true,
        center: true
    }
]

const ModeratorsPane = () => {
    const dispatch = useDispatch();

    const filterStore = useSelector(({ filter }) => filter);
    const analyticsStore = useSelector(({ analytics }) => analytics);
    const {
        moderators,
        moderator,
        moderator_comment_stats,
        moderator_comment_stats_loading
    } = analyticsStore.comments

    const items = Object.keys(moderator_comment_stats).map(date => {
        return {
            ...moderator_comment_stats[date],
            date
        }
    })

    useEffect(() => {
        dispatch(loadModerators());
    }, [filterStore]);

    return (
        <>
            <div className="mg-y-10 pd-y-2">
                <h6 className="tx-20 tx-spacing-2 mg-b-15">Moderators</h6>
                <div className="d-flex">
                    <div className="pos-relative custom-select__wrapper mr-lg-auto wd-lg-auto wd-100p">
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            className="pos-absolute custom-select__icon tx-color-05"
                        />
                        <select
                            className="d-block w-100 custom-select custom-select-md--large bd mg-b--3"
                            id="moderators"
                            name="moderators"
                            value={moderator}
                            onChange={event => dispatch(updateModerator(event.target.value))}
                        >
                            {moderators.map((mod, index) => (
                                <option key={index} value={mod}>
                                    {mod}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex">
                        <FontAwesomeIcon
                            className="svg-inline--fa panel-button mn-ht-100p mg-l-5"
                            icon={faRedoAlt}
                            style={{
                                cursor: "pointer",
                                color: "#3a84ff"
                            }}
                            onClick={() =>
                                typeof dispatch(loadModeratorCommentStats()) === "function" &&
                                dispatch(loadModeratorCommentStats())
                            }
                        />
                    </div>
                </div>
            </div>
            <DataTable
                sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
                customStyles={customStyles}
                columns={columns}
                data={items}
                noHeader={true}
                defaultSortField="date"
                defaultSortAsc={false}
                striped={true}
                dense={true}
                progressPending={moderator_comment_stats_loading}
                progressComponent={<Loader />}
            />
        </>
    );
};

export default ModeratorsPane;
