// FormFilling.js
import React, { useState, useEffect,useCallback } from "react";
import PersonalInfo from "./PersonalInfo";
import EmployerInfo from "./EmployerInfo";
import IncomeInfo from "./IncomeInfo";
import DeductionsInfo from "./DeductionsInfo";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import {
  UserOutlined,
LaptopOutlined
} from "@ant-design/icons";
import { FaMoneyBills } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { Steps } from "antd";

function OldMulti() {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Name: "",
    DateOfBirth: "",
    FatherName: "",
    Gender: "",
    MaritalStatus: "",

    AadharNo: "",
    PanCard: "",
    MobileNo: 0,
    Email: "",
    Address: "",
    PermanentAddress: "",
    City: "",
    selectedState: "",
    PinCode: "",

    employerName: "",
    employerAddress: "",
    employerPanNumber: "",
    tanNumber: "",
    employeeReferenceNo: "",
    Year: "",
    TaxDeducted: 0,

    Salary: 0,
    PrerequisiteIncome: 0,
    ProfitIncome: 0,
    OtherIncome: 0,
    HRA: 0,
    LTA: 0,
    OtherExemptedAllowances: 0,
    ProfessionalTax: 0,

    OwnHouseIncome: 0,
    RentedHouseIncome: 0,
    DeemdedHouseIncome: 0,

    BasicDeductions: 0,
    Medical: 0,
    EducationalLoan: 0,
    Nps: 0,
    Deposits: 0,
    Charity: 0,
    
    OldFinalTax: 0,
    OldFinalCess: 0,

    NewFinalTax: 0,
    NewFinalCess: 0,

    PreferredSystem: "",
  });

  const Token = localStorage.getItem("token");

  const {
    FirstName,
    MiddleName,
    LastName,
    Name,
    DateOfBirth,
    FatherName,
    Gender,
    MaritalStatus,
    AadharNo,
    PanCard,
    MobileNo,
    Email,
    Address,
    PermanentAddress,
    City,
    selectedState,
    PinCode,
    employerName,
    employerAddress,
    employerPanNumber,
    tanNumber,
    employeeReferenceNo,
    Year,
    TaxDeducted,
    Salary,
    PrerequisiteIncome,
    ProfitIncome,
    OtherIncome,
    HRA,
    LTA,
    OtherExemptedAllowances,
    ProfessionalTax,
    OwnHouseIncome,
    RentedHouseIncome,
    DeemdedHouseIncome,
    BasicDeductions,
    Medical,
    EducationalLoan,
    Nps,
    Deposits,
    Charity,

    OldFinalTax,
    OldFinalCess,

    NewFinalTax,
    NewFinalCess,

    PreferredSystem,
  } = formData;



    const handleFormDataChange = useCallback((newData) => {
  setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
}, []);

  useEffect(() => {
    const numericSalary = parseFloat(Salary) || 0;
    const numericPrerequisiteIncome = parseFloat(PrerequisiteIncome) || 0;
    const numericProfitIncome = parseFloat(ProfitIncome) || 0;
    const numericHRA = parseFloat(HRA) || 0;
    const numericLTA = parseFloat(LTA) || 0;
    const numericOtherExemptedAllowances =
      parseFloat(OtherExemptedAllowances) || 0;
    const numericProfessionalTax = parseFloat(ProfessionalTax) || 0;

    //Tax calculation
    const StandardDeductions = 50000;

    const calculateFinalTax = () => {
      const totalIncome =
        numericSalary +
        numericPrerequisiteIncome +
        numericProfitIncome -
        numericHRA -
        numericLTA -
        numericOtherExemptedAllowances -
        numericProfessionalTax;
      const totalDeductions =
        BasicDeductions + Medical + EducationalLoan + Nps + Deposits + Charity;
      const taxableIncome = totalIncome - StandardDeductions - totalDeductions;

      const { Tax, ceSS } = calculateOldRegimeTax(taxableIncome);
      const { newfinaltax, newcess } = calculateNewRegimeTax(totalIncome);

      return {
        OldTax: Tax,
        Oldess: ceSS,
        NewTax: newfinaltax,
        Newcess: newcess,
      };
    };

    // Function to calculate old regime tax
    const calculateOldRegimeTax = (income) => {
      const TAX_REBATE = {
        old: 250000,
      };

      const calculateSlabTax = (income, rate) => {
        return income * rate;
      };

      const calculateCess = (totalTax) => {
        return totalTax * 0.04;
      };

      let totalTax = 0;

      if (income >= TAX_REBATE.old) {
        totalTax += calculateSlabTax(Math.min(income, 250000), 0);
        totalTax += calculateSlabTax(
          Math.max(Math.min(income - 250000, 500000 - 250000), 0),
          0.05
        );
        totalTax += calculateSlabTax(
          Math.max(Math.min(income - 500000, 1000000 - 500000), 0),
          0.2
        );
        totalTax += calculateSlabTax(Math.max(income - 1000000, 0), 0.3);
      }

      const Tax = totalTax + calculateCess(totalTax);
      const ceSS = calculateCess(totalTax);

      return { Tax, ceSS };
    };

    const calculateNewRegimeTax = (income) => {
      const TAX_REBATE_NEW = {
        new: 700000,
      };

      const calculateSlabTax = (income, rate) => income * rate;

      let totalTax = 0;

      if (income >= TAX_REBATE_NEW.new) {
        totalTax += calculateSlabTax(Math.min(income, 300000), 0);
        totalTax += calculateSlabTax(
          Math.max(Math.min(income - 300000, 300000), 0),
          0.05
        );
        totalTax += calculateSlabTax(
          Math.max(Math.min(income - 600000, 300000), 0),
          0.1
        );
        totalTax += calculateSlabTax(
          Math.max(Math.min(income - 900000, 300000), 0),
          0.15
        );
        totalTax += calculateSlabTax(
          Math.max(Math.min(income - 1200000, 300000), 0),
          0.2
        );
        totalTax += calculateSlabTax(Math.max(income - 1500000, 0), 0.3);
      }

      const calculateCess = (totalTax) => {
        const newCess = totalTax * 0.04;
        return newCess;
      };

      const newfinaltax = totalTax + calculateCess(totalTax);

      return { newfinaltax, cess: calculateCess(totalTax) };
    };

    const { OldTax, Oldess, NewTax, Newcess } = calculateFinalTax();

    const preferredSystem =
      NewFinalTax < OldFinalTax ? "NEW REGIME" : "OLD REGIME";

    handleFormDataChange({
      ...formData,
      OldFinalTax: OldTax,
      OldFinalCess: Oldess,
      NewFinalTax: NewTax,
      NewFinalCess: Newcess,
      PreferredSystem: preferredSystem
    });
  }, [
    Salary,
    PrerequisiteIncome,
    ProfitIncome,
    OtherIncome,
    HRA,
    LTA,
    OtherExemptedAllowances,
    ProfessionalTax,
    RentedHouseIncome,
    DeemdedHouseIncome,
    BasicDeductions,
    Medical,
    EducationalLoan,
    Nps,
    Deposits,
    Charity,
    OldFinalTax,
    OldFinalCess,
    NewFinalTax,
    NewFinalCess,
    PreferredSystem,
    handleFormDataChange,
    formData,
  ]);



  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isCheckboxChecked) {
    try {
      const response = await axios.post(
        "http://localhost:8000/policy/oldreign",
        {
          Token,formData
        } // Send the formData directly in the request body
      );

      // Handle success, if needed
      console.log(response.data); // Log the response data
      toast.success("Data is saved. You will be redirected in a few seconds");
    }catch (err) {
        toast.error("Try again after some time");
        console.error(err);
      }
    } else {
      toast.warning("Please verify the information before submitting.");
    }
  };


  const steps = [
    <PersonalInfo formData={formData} onChange={handleFormDataChange} />,
    <EmployerInfo formData={formData} onChange={handleFormDataChange} />,
    <IncomeInfo formData={formData} onChange={handleFormDataChange} />,
    <DeductionsInfo formData={formData} onChange={handleFormDataChange} />,
  ];

    const antdSteps = [
      {
        title: "Personal Info",
        status: step > 1 ? "finish" : "process",
        icon: <UserOutlined />,
      },
      {
        title: "Employer Info",
        status: step > 2 ? "finish" : "wait",
        icon: <LaptopOutlined />,
      },
      {
        title: "Income Sources",
        status: step > 3 ? "process" : "wait",
        icon: <FaMoneyBills />,
      },
      {
        title: "Deductions",
        status: step === steps.length ? "finish" : "wait",
        icon: <TbPigMoney />,
      },
    ];

  return (
    <section id="form-filling">
      <Steps current={step - 1} items={antdSteps} style={{marginTop: "1rem",marginBottom: "1rem"}}/>
      <div className="personalInfo">
        <form onSubmit={handleSubmit}>
          {steps[step - 1]}
          <div
            style={{
              marginTop: "20px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            {step > 1 && (
              <Button variant="secondary" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < steps.length && (
              <Button variant="primary" onClick={nextStep}>
                Next
              </Button>
            )}
            {step === steps.length && (
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Form.Group
                  className="mb-3"
                  id="formGridCheckbox"
                  style={{ margin: "auto" }}
                >
                  <Form.Check
                    type="checkbox"
                    label="Have you verified the Information"
                    onChange={(e) => {
                      setIsCheckboxChecked(e.target.checked);
                    }}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  disabled={!isCheckboxChecked}
                >
                  Submit
                </Button>
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default OldMulti;
