import React, { useState } from "react"
import { useRouter } from "next/router"
import { Pane } from "evergreen-ui"

import TechOssPane from "./TechOssPane"
import TechBrowsersPane from "./TechBrowsersPane"
import TechDevicesPane from "./TechDevicesPane"
import SelectTab from "@/components/SelectTab"

const tabs = [
  {
    title: "Technology Analytics by OS",
    disabled: false
  },{
    title: "Technology Analytics by Browsers",
    disabled: false
  },{
    title: "Technology Analytics by Devices",
    disabled: false
  }
]

const TechPane = () => {
  const router = useRouter()

  const pathname = router.pathname
  let query = router.query

  let { subtab } = query
  subtab = parseInt(subtab)

  if (!_.includes(_.range(tabs.length), subtab)) {
    subtab = 0
  }
  if (subtab != query.subtab) {
    query.subtab = subtab
    router.replace({ pathname, query })
  }

  const [currentTab, setCurrentTab] = useState(subtab)

  return (
    <Pane width="100%" paddingTop={12}>
      <SelectTab
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={(index) => {
          setCurrentTab(index)
          query.subtab = index
          router.push({ pathname, query })
        }}
      />
      {currentTab === 0 && <TechOssPane />}
      {currentTab === 1 && <TechBrowsersPane />}
      {currentTab === 2 && <TechDevicesPane />}
    </Pane>
  )
}

export default TechPane
