import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlt,
  faSearch,
  faRedoAlt,
} from "@fortawesome/pro-solid-svg-icons";

import customStyles from "../../commonSettings";
import ExportToExcel from "@/components/ExportToExcel";
import Loader from "@/components/Loader";
import { TooltipContainer } from "@/components/Tooltip";

import { containsFilter, kmFormat } from "@/utils";
import moment from "moment";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="City">
        City
      </TooltipContainer>
    ),
    selector: "city",
    sortable: true,
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Total count">
        #
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.count),
    sortable: true,
    center: true,
  },
];

const GeoCitiesContainer = (props) => {
  const { title, top_cities, top_cities_loading } = props;
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("");
  const filterStore = useSelector(({ filter }) => filter);
  const sessionStore = useSelector(({ session }) => session);

  const items = Object.keys(top_cities).map((city) => {
    return {
      city,
      count: top_cities[city],
    };
  });

  const filteredItems = items.filter((item) => containsFilter(item, filter));

  const formattedData = React.useMemo(() => {
    return filteredItems.map((item) => {
      return {
        City: item.city,
        "#": item.count,
      };
    });
  }, [filteredItems]);

  return (
    <>
      <div className="mg-y-10 pd-y-2">
        <h6 className="tx-20 tx-spacing-2 mg-b-15">{title}</h6>
        <div className="d-flex">
          <div className="pos-relative mr-lg-auto wd-lg-auto wd-100p mn-wd-lg-215">
            <input
              type="search"
              placeholder="Search city"
              value={filter}
              className="search-input outline-none"
              onChange={(event) => setFilter(event.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="pos-absolute" />
          </div>
          <div className="d-flex">
            <FontAwesomeIcon
              className="svg-inline--fa panel-button mn-ht-100p mg-x-5"
              icon={faRedoAlt}
              style={{
                cursor: "pointer",
                color: "#3a84ff",
              }}
              onClick={() =>
                typeof dispatch(props.onRefresh) === "function" &&
                dispatch(props.onRefresh)
              }
            />
            <ExportToExcel
              excelData={formattedData}
              fileName={`analytics_top_cities_${
                filterStore.host || sessionStore.apiKey
              }_${moment(filterStore.dateRange[0]).format(
                "YYYY-MM-DD"
              )}-${moment(filterStore.dateRange[1]).format("YYYY-MM-DD")}`}
            />
          </div>
        </div>
      </div>
      <DataTable
        sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
        customStyles={customStyles}
        columns={columns}
        data={filteredItems}
        noHeader={true}
        striped={true}
        dense={true}
        progressPending={top_cities_loading}
        progressComponent={<Loader />}
      />
    </>
  );
};

export default GeoCitiesContainer;
