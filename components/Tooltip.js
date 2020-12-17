import React, { useState } from "react";
import { Icon } from "evergreen-ui"
import ReactTooltip from "react-tooltip"
import styled from "styled-components";

const TooltipBox = styled.div`
  font-size: 10px;
  font-weight: normal;
  text-transform: none;
`

const Tooltip = ({ id, content }) => (
  <TooltipBox>
    <a 
      data-for="tooltip"
      data-tip={content}
    >
      <Icon icon="help" />
    </a>
    <ReactTooltip
      id={id}
      type="warning"
      place="bottom"
      backgroundColor="#FFF5AD"
      textColor="black"
      border={true}
      borderColor="#C6C5BD"
      multiline={true}
    />
  </TooltipBox>
)

export const TooltipContainer = ( props ) => {
  const { tooltip } = props
  const [hover, setHover] = useState(false)

  return (
    <>
    { tooltip ? (
      <div {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.children}
        {hover && <Tooltip id="tooltip" content={tooltip} />}
      </div>
    ):(
      <div {...props}>
        {props.children}
      </div>
    )}
    </>
  )
}

Tooltip.defaultProps = {
  id: "tooltip",
  content: ""
}

export default Tooltip
