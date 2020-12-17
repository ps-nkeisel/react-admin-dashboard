import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel
} from "@fortawesome/pro-solid-svg-icons";

const ExportExcel = ({ excelData, fileName, displayAs }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = (excelData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  if (displayAs) {
    return (
      displayAs(() => exportToExcel(excelData, fileName))
    );
  } else {
    return (
      <button
        className="btn btn-outline-primary bg-white vu-export-excel-btn"
        onClick={() => exportToExcel(excelData, fileName)}
      > 
        <FontAwesomeIcon className="mr-lg-2" icon={faFileExcel} />
        <span className="d-none d-lg-inline">Export to Excel</span>
      </button>
    );
  }

};

export default ExportExcel;
