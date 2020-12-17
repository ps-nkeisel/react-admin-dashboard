import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "evergreen-ui";
import moment from "moment";

import RevenuePaymentTable from "../components/RevenuePaymentTable"

import { 
  clearError, 
  loadPaymentHistory, 
} from "@/services/actions/revenue"

import Loader from '@/components/Loader'

const RevenuePaymentPane = () => {
  const dispatch = useDispatch()

  const filterStore = useSelector(({ filter }) => filter)
  const { dateRange } = filterStore
  const revenueStore = useSelector(({ revenue }) => revenue)
  const { payments_loading, error } = revenueStore

  useEffect(() => {
    if (moment(dateRange[0], 'YYYY-MM-DD', true).isValid() && moment(dateRange[1], 'YYYY-MM-DD', true).isValid()) {
      dispatch(loadPaymentHistory())
    }
  }, [dateRange])

  if (error) {
    if (error === "no_revenue_found") {
      toaster.warning(
        "No revenue data was found for specified date range and site.",
        {
          id: "revenue_error",
          description: "Please try selecting a different date range or a site"
        }
      )
    } else {
      toaster.warning("Something went wrong with the data request", {
        id: "revenue_error"
      })
    }
    dispatch(clearError())
  }

  return (
    <>
      { payments_loading ?
        <Loader />
      :
        <RevenuePaymentTable />
      }
    </>
  )
}

export default RevenuePaymentPane
