import React, { useState } from "react"
import { useRouter } from "next/router"
import { Pane } from "evergreen-ui"

import GeoCountriesPane from "./GeoCountriesPane"
import GeoCitiesPane from "./GeoCitiesPane"
import SelectTab from "@/components/SelectTab"

const tabs = [
  {
    title: "Analytics by Countries",
    disabled: false
  },{
    title: "Analytics by Cities",
    disabled: false
  }
]

const GeoPane = () => {
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
    <Pane paddingTop={12}>
      <SelectTab
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={(index) => {
          setCurrentTab(index)
          query.subtab = index
          router.push({ pathname, query })
        }}
      />
      {currentTab === 0 && <GeoCountriesPane />}
      {currentTab === 1 && <GeoCitiesPane />}
    </Pane>
  )
}

export default GeoPane
