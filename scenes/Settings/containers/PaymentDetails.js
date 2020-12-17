import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../ducks/settings";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(
    ({ settingsPage }) => settingsPage.paymentData
  );
  const [beneficiaryName, setBeneficiaryName] = useState(
    (paymentData && paymentData.companyName) || ""
  );
  const [beneficiaryAddress, setBeneficiaryAddress] = useState(
    (paymentData && paymentData.companyAddress) || ""
  );
  const [bankACNO, setBankACNO] = useState(
    (paymentData && paymentData.bankAcNo) || ""
  );
  const [cityOfBank, setCityOfBank] = useState(
    (paymentData && paymentData.bankCity) || ""
  );
  const [nameOfBank, setNameOfBank] = useState(
    (paymentData && paymentData.bankName) || ""
  );
  const [branch, setBranch] = useState(
    (paymentData && paymentData.branchName) || ""
  );
  const [accountType, setAccountType] = useState(
    (paymentData && paymentData.accountType) || ""
  );
  const [swiftCode, setSwiftCode] = useState(
    (paymentData && paymentData.swift) || ""
  );

  const isAnyFieldFilled =
    beneficiaryName &&
    beneficiaryAddress &&
    bankACNO &&
    cityOfBank &&
    nameOfBank &&
    branch &&
    accountType &&
    swiftCode;

  useEffect(() => {
    dispatch(actions.getPaymentDetails());
  }, []);

  useEffect(() => {
    if (paymentData) {
      setBeneficiaryName(paymentData.companyName || "");
      setBeneficiaryAddress(paymentData.companyAddress || "");
      setBankACNO(paymentData.bankAcNo || "");
      setCityOfBank(paymentData.bankCity || "");
      setNameOfBank(paymentData.bankName || "");
      setBranch(paymentData.branchName || "");
      setAccountType(paymentData.accountType || "");
      setSwiftCode(paymentData.swift || "");
    }
  }, [paymentData]);

  const savePaymentData = () => {
    const paymentObject = {
      companyName: beneficiaryName,
      companyAddress: beneficiaryAddress,
      bankAcNo: bankACNO,
      bankCity: cityOfBank,
      bankName: nameOfBank,
      branchName: branch,
      accountType,
      swift: swiftCode,
      billingDataExists: Boolean(paymentData)
    };
    dispatch(actions.setOrUpdatePaymentDetails(paymentObject));
  };

  return (
    <>
      <h3 className="tx-20 tx-spacing-1 mb-4">Payment Details</h3>
      <form onSubmit={e => e.preventDefault()}>
        <div className="row settings__row">
          <div className="col-sm-12">
            <div className="form-group">
              <label className="bp3-label" htmlFor="beneficiaryName">
                Beneficiary name
                <input
                  type="text"
                  className="form-control"
                  id="beneficiaryName"
                  placeholder="Enter your beneficiary name"
                  value={beneficiaryName}
                  maxLength={100}
                  onChange={e => setBeneficiaryName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="bp3-label" htmlFor="beneficiaryAddress">
                Beneficiary address
                <input
                  type="text"
                  className="form-control"
                  id="beneficiaryAddress"
                  placeholder="Enter your beneficiary address"
                  value={beneficiaryAddress}
                  maxLength={200}
                  onChange={e => setBeneficiaryAddress(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="bp3-label" htmlFor="bankACNO">
                Bank A/C NO.
                <input
                  type="text"
                  className="form-control"
                  id="bankACNO"
                  placeholder="Enter your bank A/C NO."
                  value={bankACNO}
                  maxLength={45}
                  onChange={e => setBankACNO(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <label className="bp3-label" htmlFor="cityOfBank">
                City of bank
                <input
                  type="text"
                  className="form-control"
                  id="cityOfBank"
                  placeholder="Enter city of bank"
                  value={cityOfBank}
                  maxLength={100}
                  onChange={e => setCityOfBank(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="bp3-label" htmlFor="nameOfBank">
                Name of bank
                <input
                  type="text"
                  className="form-control"
                  id="nameOfBank"
                  placeholder="Enter name of bank"
                  value={nameOfBank}
                  maxLength={200}
                  onChange={e => setNameOfBank(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="bp3-label" htmlFor="branch">
                Branch
                <input
                  type="text"
                  className="form-control"
                  id="branch"
                  placeholder="Enter branch"
                  value={branch}
                  maxLength={200}
                  onChange={e => setBranch(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <label className="bp3-label" htmlFor="accountType">
                Account type
                <input
                  type="text"
                  className="form-control"
                  id="accountType"
                  placeholder="Enter your account type"
                  value={accountType}
                  maxLength={45}
                  onChange={e => setAccountType(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="bp3-label" htmlFor="swiftCode">
                SWIFT code
                <input
                  type="text"
                  className="form-control"
                  id="swiftCode"
                  placeholder="Enter your SWIFT code"
                  value={swiftCode}
                  maxLength={45}
                  onChange={e => setSwiftCode(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="col-sm-12">
            <button
              className="btn-primary btn-fill tx-16"
              disabled={!isAnyFieldFilled}
              onClick={savePaymentData}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PaymentDetails;
