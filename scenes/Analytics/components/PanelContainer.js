import React, { useState } from "react";
import {
  Pane,
  Text,
  Position,
  Popover,
  Menu
} from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompressAlt,
  faRedoAlt,
  faList
} from "@fortawesome/pro-solid-svg-icons";

import Tooltip from "@/components/Tooltip";

const PanelContainer = props => {
  const { title, refresh, list, toggle, tooltip } = props;

  const [hover, setHover] = useState(false);
  const [hide, setHide] = useState(false);

  const renderDownloadMenu = () => (
    <Menu>
      <Menu.Group>
        <Menu.Item
          onSelect={() =>
            typeof props.onDownloadPNG === "function" && props.onDownloadPNG()
          }
        >
          Download PNG image
        </Menu.Item>
        <Menu.Item
          onSelect={() =>
            typeof props.onDownloadPDF === "function" && props.onDownloadPDF()
          }
        >
          Download PDF Document
        </Menu.Item>
      </Menu.Group>
    </Menu>
  );

  const renderIcons = () => (
    <Pane display="flex" alignItems="center" className="panel-buttons">
      {toggle && (
        <FontAwesomeIcon
          className="svg-inline--fa panel-button"
          icon={faCompressAlt}
          style={{ cursor: "pointer", marginLeft: "12px ", color: "#3a84ff" }}
          onClick={() => setHide(!hide)}
        />
      )}
      {refresh && (
        <FontAwesomeIcon
          className="svg-inline--fa panel-button"
          icon={faRedoAlt}
          style={{ cursor: "pointer", marginLeft: "12px ", color: "#3a84ff" }}
          onClick={() =>
            typeof props.onRefresh === "function" && props.onRefresh()
          }
        />
      )}
      {list && (
        <Popover
          content={renderDownloadMenu()}
          position={Position.BOTTOM_LEFT}
          minimal={true}
        >
          <FontAwesomeIcon
            icon={faList}
            className="svg-inline--fa panel-button"
            style={{ cursor: "pointer", marginLeft: "12px", color: "#3a84ff" }}
          />
        </Popover>
      )}
    </Pane>
  );

  return (
    <>
      {tooltip ? (
        <Pane
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Pane display="flex" alignItems="center" paddingBottom={12}>
            <Pane marginRight="auto" display="flex">
              {title && (
                <Text
                  marginRight={6}
                  fontSize={20}
                  fontFamily="IBM Plex Sans, sans-serif"
                  letterSpacing="1px"
                  marginBottom="15px"
                  color="#001736"
                >
                  {title}
                </Text>
              )}
              {hover && <Tooltip id="tooltip" content={tooltip} />}
            </Pane>
            {renderIcons()}
          </Pane>
          <Pane>{!hide && props.children}</Pane>
        </Pane>
      ) : (
        <Pane>
          <Pane
            display="flex"
            alignItems="center"
            paddingTop={12}
            paddingBottom={12}
            background="tint2"
          >
            <Pane marginRight="auto">
              <span className="tx-20 tx-spacing-2 tx-normal">{title}</span>
            </Pane>
            {renderIcons()}
          </Pane>
          <Pane>{!hide && props.children}</Pane>
        </Pane>
      )}
    </>
  );
};

PanelContainer.defaultProps = {
  refresh: true,
  list: true,
  toggle: false,
  tooltip: null
};

export default PanelContainer;
