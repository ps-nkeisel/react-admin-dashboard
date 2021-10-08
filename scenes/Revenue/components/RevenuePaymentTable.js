import React, { useState }  from "react"
import { useSelector } from "react-redux"
import { Pane, TextInput } from "evergreen-ui"
import DataTable from "react-data-table-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortAlt, faSearch } from "@fortawesome/pro-solid-svg-icons"
// import moment from "moment"

import Loader from '@/components/Loader'
import customStyles from "@/scenes/commonSettings"
import { TooltipContainer } from "@/components/Tooltip";

import { containsFilter, dollarFormat } from "@/utils"

const columns = [
  // {
  //   name: "DATE",
  //   sortable: true,
  //   maxWidth: "110px",
  //   cell: row => moment(row.createdTimestamp).format('YYYY-MM-DD')
  // },
  // {
  //   name: "Month",
  //   sortable: true,
  //   center : true,
  //   cell: row => moment(row.date).format('M')
  // },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Notes">
        Notes
      </TooltipContainer>
    ),
    selector: "notes",
    sortable: true,
    center: true
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Total revenue generated by Admin net to the publisher">
        Revenue Generated
      </TooltipContainer>
    ),
    cell: row => `${dollarFormat.format(parseFloat(row.revenueGenerated))}`,
    sortable: true,
    center: true
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Other revenues generated by Admin">
        Other Revenue
      </TooltipContainer>
    ),
    cell: row => `${dollarFormat.format(parseFloat(row.otherRevenue))}`,
    sortable: true,
    center: true
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="The date when payment was made">
        Date Of Payment
      </TooltipContainer>
    ),
    selector: "dateOfPayment",
    sortable: true,
    center: true
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="The amount paid by Admin">
        Amount Paid
      </TooltipContainer>
    ),
    cell: row => `${dollarFormat.format(parseFloat(row.amountPaid))}`,
    sortable: true,
    center: true
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Monthly platform fee">
        Platform Fee
      </TooltipContainer>
    ),
    cell: row => `${dollarFormat.format(parseFloat(row.platformFee))}`,
    sortable: true,
    center: true
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="The NET balance which is due for this particular month">
        Net Balance
      </TooltipContainer>
    ),
    cell: row => `${dollarFormat.format(parseFloat(row.netBalance))}`,
    sortable: true,
    center: true
  }
]

const RevenuePaymentTable = () => {
  const tableData = useSelector(({ revenue }) => revenue.payments)
  const [filter, setFilter] = useState("")
  
  const filteredItems = tableData.filter(item => containsFilter(item, filter))
   
  // const formattedData = React.useMemo(() => {
  //   return _.map(tableData, (item) => ({
  //     'createdTimestamp': moment(item.createdTimestamp).format('YYYY-MM-DD'),
  //     'revenueGenerated': dollarFormat.format(parseFloat(item.revenueGenerated)),
  //     'amountPaid': dollarFormat.format(parseFloat(item.amountPaid)),
  //     'platformFee': dollarFormat.format(parseFloat(item.platformFee)),
  //     'netBalance': dollarFormat.format(parseFloat(item.netBalance))
  //   }))
  //   }, [tableData])
  
  return (
    <>
      <div  className="d-block justify-content-between">
        <p className="tx-20 tx-spacing-2 tx-normal mg-b-0">Payment History</p>
        <div className="position-relative" style={{padding: "12px 0"}}>
        <TextInput
          height={42}
          placeholder="Search Tag"
          value={filter}
          onChange={event => setFilter(event.target.value)}
          paddingLeft={28}
          border="1px solid #E5E9F2 !important"
          boxShadow="none !important"
          className='w-100 mx-wd-lg-215 h-lg-32'
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="pos-absolute tx-color-05 t-0 b-0 l-0 mg-l-8 my-auto"
        />
        </div>
      </div>
      <Pane width="100%">
        <DataTable
          progressComponent={<Loader />}
          fixedHeader={true}
          fixedHeaderScrollHeight={"500px"}
          sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
          customStyles={customStyles}
          columns={columns}
          data={filteredItems}
          noHeader={true}
          striped={true}
          dense={true}
        />
      </Pane>
    </>
  )
}

export default RevenuePaymentTable