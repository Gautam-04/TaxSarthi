// DeductionsInfo.js
import React, { useState, useEffect } from "react";
import "../Form.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IoInformationCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";


const DeductionsInfo = ({ formData, onChange }) => {

  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href=" " style={{ color: "black", textDecoration: "none" }}>
        {children}
      </a>
    </OverlayTrigger>
  );

  const handleHousingLoanChange = (e) => {
    const inputValue = parseInt(e.target.value, 10) || 0;
    const limit = 150000;

    if (inputValue > limit) {
      toast.error("Keep the amount less than Rs 1,50,000");
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }

    onChange({ HousingLoan: inputValue });
  };

  const {
    Salary, PrerequisiteIncome, ProfitIncome, OtherIncome, HRA, LTA,  OtherExemptedAllowances, ProfessionalTax,   OwnHouseIncome, RentedHouseIncome, DeemdedHouseIncome,
    BasicDeductions,
    Medical,
    EducationalLoan,
    Nps,
    Deposits,
    Charity,
    HousingLoan,
    finalTax,
    cess
  } = formData;


  // useEffect(() => {
  //   // Function to calculate final tax
  //   const StandardDeductions = 50000;
  //   const calculateFinalTax = () => {
  //     const totalIncome =
  //       Salary +
  //       PrerequisiteIncome +
  //       ProfitIncome +
  //       OtherIncome -
  //       HRA -
  //       LTA -
  //       OtherExemptedAllowances -
  //       ProfessionalTax -
  //       OwnHouseIncome +
  //       RentedHouseIncome +
  //       DeemdedHouseIncome;
  //     const totalDeductions =
  //       BasicDeductions +
  //       Medical +
  //       EducationalLoan +
  //       Nps +
  //       Deposits +
  //       Charity +
  //       HousingLoan;
  //     const taxableIncome = totalIncome - StandardDeductions - totalDeductions;

  //     const calculatedTax = calculateOldRegimeTax(taxableIncome);

  //     onChange({
  //       finalTax: calculatedTax,
  //     });
  //   };

  //   // Function to calculate old regime tax
  //   const calculateOldRegimeTax = (income) => {
  //     const TAX_REBATE = {
  //       old: 250000,
  //     };

  //     const calculateSlabTax = (income, rate) => {
  //       return income * rate;
  //     };

  //     const calculateCess = (totalTax) => {
  //       onChange({ cess: totalTax * 0.04 });
  //       return totalTax * 0.04;
  //     };

  //     let totalTax = 0;

  //     if (income >= TAX_REBATE.old) {
  //       totalTax += calculateSlabTax(Math.min(income, 250000), 0);
  //       totalTax += calculateSlabTax(
  //         Math.max(Math.min(income - 250000, 500000 - 250000), 0),
  //         0.05
  //       );
  //       totalTax += calculateSlabTax(
  //         Math.max(Math.min(income - 500000, 1000000 - 500000), 0),
  //         0.2
  //       );
  //       totalTax += calculateSlabTax(Math.max(income - 1000000, 0), 0.3);
  //     }

  //     const finalTax = totalTax + calculateCess(totalTax);

  //     return finalTax;
  //   };

  //   // Call the calculateFinalTax function when any of the inputs change
  //   calculateFinalTax();
  // }, [Salary, PrerequisiteIncome, ProfitIncome, OtherIncome, HRA, LTA, OtherExemptedAllowances, ProfessionalTax, OwnHouseIncome, RentedHouseIncome, DeemdedHouseIncome, BasicDeductions, Medical, EducationalLoan, Nps, Deposits, Charity, HousingLoan, finalTax, cess, onChange]);

  return (
    <>
      <h1 className="formTitle">Deductions</h1>
      <hr style={{ marginBottom: 20 }} />
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Basic Deductions - 80c
            <span style={{ marginLeft: "10px", alignContent: "center" }}>
              <Link
                id="t-2"
                title="Amount invested/paid in tax saving instruments such as PPF, ELSS mutual funds, LIC premium, etc. (max: 1.5L)
                    "
              >
                <IoInformationCircleOutline />
              </Link>
            </span>
          </Form.Label>
          <Form.Control
            placeholder="0"
            value={BasicDeductions}
            onChange={(e) =>
              onChange({ BasicDeductions: parseInt(e.target.value, 10) || 0 })
            }
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Medical Insurance - 80D
            <span style={{ marginLeft: "10px", alignContent: "center" }}>
              <Link
                id="t-2"
                title="Medical premium & preventive health checkup fees paid for self & family including parents
                    "
              >
                <IoInformationCircleOutline />
              </Link>
            </span>
          </Form.Label>
          <Form.Control
            placeholder="0"
            value={Medical}
            onChange={(e) =>
              onChange({ Medical: parseInt(e.target.value, 10) || 0 })
            }
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Educational Loan - 80E
            <span style={{ marginLeft: "10px", alignContent: "center" }}>
              <Link
                id="t-2"
                title="Amount of interest paid on loan taken for higher education
                    "
              >
                <IoInformationCircleOutline />
              </Link>
            </span>
          </Form.Label>
          <Form.Control
            placeholder="0"
            value={EducationalLoan}
            onChange={(e) =>
              onChange({ EducationalLoan: parseInt(e.target.value, 10) || 0 })
            }
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Employee's Contribution To Nps - 80CCD
            <span style={{ marginLeft: "10px", alignContent: "center" }}>
              <Link
                id="t-2"
                title="Includes voluntary contribution to National Pension Scheme (NPS) under section 80CCD(1) and 80CCD(1B)
                    "
              >
                <IoInformationCircleOutline />
              </Link>
            </span>
          </Form.Label>
          <Form.Control
            placeholder="0"
            value={Nps}
            onChange={(e) =>
              onChange({ Nps: parseInt(e.target.value, 10) || 0 })
            }
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Interest from Deposits - 80TTA
            <span style={{ marginLeft: "10px", alignContent: "center" }}>
              <Link
                id="t-2"
                title="Amount of interest income on deposits in savings account (includes fixed/recurring deposit interest in case of senior citizen) 
                    "
              >
                <IoInformationCircleOutline />
              </Link>
            </span>
          </Form.Label>
          <Form.Control
            placeholder="0"
            value={Deposits}
            onChange={(e) =>
              onChange({ Deposits: parseInt(e.target.value, 10) || 0 })
            }
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Charity - 80G
            <span style={{ marginLeft: "10px", alignContent: "center" }}>
              <Link
                id="t-2"
                title="Amount paid as donation to charitable insitutions or certain recognized funds
                    "
              >
                <IoInformationCircleOutline />
              </Link>
            </span>
          </Form.Label>
          <Form.Control
            placeholder="0"
            value={Charity}
            onChange={(e) =>
              onChange({ Charity: parseInt(e.target.value, 10) || 0 })
            }
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label style={{ display: "flex", alignItems: "center" }}>
            Housing Loan - 80EEA
            <span style={{ marginLeft: "10px", alignContent: "center" }}>
              <Link
                id="t-2"
                title="Amount of interest paid on housing loan sanctioned during FY 2021-2022 (max: 1.5L)
                    "
              >
                <IoInformationCircleOutline />
              </Link>
            </span>
          </Form.Label>
          <Form.Control
            placeholder="0"
            value={HousingLoan}
            onChange={handleHousingLoanChange}
          />
        </Form.Group>
      </Row>
    </>
  );
};

export default DeductionsInfo;
