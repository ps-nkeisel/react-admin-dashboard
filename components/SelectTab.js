import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/pro-solid-svg-icons"

const SelectTab = ({ tabs, fullWidth, sizeLarge, currentTab, setCurrentTab }) => (
  <div className="d-lg-flex align-items-lg-start mg-lg-b--15">
    {tabs[currentTab].title && (
      <h6 className="tx-20 tx-spacing-2 tx-normal mg-r-auto">{tabs[currentTab].title}</h6>
    )}

    <div className={`pos-relative ${fullWidth ? "w-100" : ""}`}>
      <FontAwesomeIcon
        icon={faCaretDown}
        className="pos-absolute custom-select__icon tx-color-05"
      />
      <select
        className={`d-block w-100 custom-select custom-select-md--large bd select-tab ${
          sizeLarge === true ? "custom-select--large" : ""
        }`}
        id="tabs"
        name="tabs"
        value={currentTab}
        onChange={e => setCurrentTab(+e.target.value)}
      >
        {tabs.map((tab, index) => !tab.disabled && (
          <option key={index} value={index}>
            {tab.title}
          </option>
        ))}
      </select>
    </div>
  </div>
)

SelectTab.propTypes = {
  tabs: PropTypes.array,
  currentTab: PropTypes.number,
  setCurrentTab: PropTypes.func
}

SelectTab.defaultProps = {
  tabs: [],
  fullWidth: false,
  sizeLarge: false,
  currentTab: 0,
  setCurrentTab: f => f
}

export default SelectTab
