/* eslint-disable no-unused-expressions */
import React,{useState,useEffect,useCallback} from 'react'
import './Form.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import CheckBox from '../../components/mis/CheckBox';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import States from '../../utils/States.json';
import axios from 'axios';
import { IoInformationCircleOutline  } from "react-icons/io5";
import { toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import {
  FaRegCircleUser,
  FaRegAddressCard,
  FaLaptopCode,
} from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { BsFillHouseAddFill } from "react-icons/bs";
import "./Accordion.css";
import ImageModal from "../../components/mis/ImageModal";

const encodeAadhar = (aadharNumber) => {
  let encodedAadhar = 0;
  let multiplier = 1;

  while (aadharNumber > 0) {
    const digit = ((aadharNumber % 10) + 3) % 10; // Ensure the result is between 0 and 9
    encodedAadhar += digit * multiplier;
    aadharNumber = Math.floor(aadharNumber / 10);
    multiplier *= 10;
  }

  return encodedAadhar;
};

const decodeAadhar = (excess3Code) => {
  let decodedAadhar = 0;
  let multiplier = 1;

  while (excess3Code > 0) {
    const digit = ((excess3Code % 10) - 3 + 10) % 10; // Ensure the result is between 0 and 9
    decodedAadhar += digit * multiplier;
    excess3Code = Math.floor(excess3Code / 10);
    multiplier *= 10;
  }

  return decodedAadhar;
};

function FormFilling() {
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

  BasicDeductions: 0,
  Medical: 0,
  EducationalLoan: 0,
  Nps: 0,
  Deposits: 0,
  Charity: 0,
});

const [RentedHouseIncome, setRentedHouseIncome] = useState(0);
const [DeemdedHouseIncome, setDeemdedHouseIncome] = useState(0);

const [OldFinalTax, setOldFinalTax] = useState(0);
const [OldFinalCess, setOldFinalCess] = useState(0);
const [NewFinalTax, setNewFinalTax] = useState(0);
const [NewFinalCess, setNewFinalCess] = useState(0);
const [PreferredSystem, setPreferredSystem] = useState("");

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
  BasicDeductions,
  Medical,
  EducationalLoan,
  Nps,
  Deposits,
  Charity,

} = formData;




 //Checkboxes
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [sameAsAddress, setSameAsAddress] = useState(false);

const handleChange = useCallback((newData) => {
  setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
}, []);

     const [showIncomeModal, setShowIncomeModal] = useState(false);
     const [showProfitsModal, setShowProfitsModal] = useState(false);
     const [HeadIncome, setHeadIncome] = useState(0);

     const [RentedhomeInterestPaid, setRentedHomeInterestPaid] = useState(0);
     const [RentedrentReceived, setRentedRentReceived] = useState(0);
     const [RentedmunicipalTax1, setRentedMunicipalTax1] = useState(0);

     const [DeemedhomeInterestPaid, setDeemedHomeInterestPaid] = useState(0);
     const [DeemedrentReceived, setDeemedRentReceived] = useState(0);
     const [DeemedmunicipalTax1, setDeemedMunicipalTax1] = useState(0);

     useEffect(() => {
       const numericSalary = parseFloat(Salary) || 0;
       const numericPrerequisiteIncome = parseFloat(PrerequisiteIncome) || 0;
       const numericProfitIncome = parseFloat(ProfitIncome) || 0;
       const numericHRA = parseFloat(HRA) || 0;
       const numericLTA = parseFloat(LTA) || 0;
       const numericOtherExemptedAllowances =
         parseFloat(OtherExemptedAllowances) || 0;
       const numericProfessionalTax = parseFloat(ProfessionalTax) || 0;

       //house incomes
       const numericRentedhomeInterest =
         parseFloat(RentedhomeInterestPaid) || 0;
       const numericRentedrentReceived = parseFloat(RentedrentReceived) || 0;
       const numericRentedmunicipalTax1 = parseFloat(RentedmunicipalTax1) || 0;

       const numericDeemedhomeInterestPaid =
         parseFloat(DeemedhomeInterestPaid) || 0;
       const numericDeemedrentReceived = parseFloat(DeemedrentReceived) || 0;
       const numericDeemedmunicipalTax1 = parseFloat(DeemedmunicipalTax1) || 0;

       const calculateSlabTax = (income, rate) => {
         return income * rate;
       };
       const finalRentedIncome = calculateSlabTax(
         numericRentedrentReceived - numericRentedmunicipalTax1,
         0.3
       );
       const ReIncome = numericRentedrentReceived - numericRentedmunicipalTax1 - finalRentedIncome;
       const Rented = Math.min(ReIncome - numericRentedhomeInterest, 200000);
       const finalDeemedIncome = calculateSlabTax(
         numericDeemedrentReceived - numericDeemedmunicipalTax1,
         0.3
       );
       const DeIncome = numericDeemedrentReceived - numericDeemedmunicipalTax1 - finalDeemedIncome;

       const Deemded = Math.min(
         DeIncome - numericDeemedhomeInterestPaid,
         200000
       );

       const totalIncome =
         numericSalary +
         numericPrerequisiteIncome +
         numericProfitIncome -
         numericHRA -
         numericLTA -
         numericOtherExemptedAllowances -
         numericProfessionalTax;

       const updatedTotalIncome = isNaN(totalIncome) ? 0 : totalIncome;

       setHeadIncome(updatedTotalIncome);

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

const preferredSystem = NewFinalTax < OldFinalTax ? "NEW REGIME" : "OLD REGIME";

setRentedHouseIncome(Rented);
setDeemdedHouseIncome(Deemded);

setOldFinalTax(OldTax);
setOldFinalCess(Oldess);
setNewFinalTax(NewTax);
setNewFinalCess(Newcess);
setPreferredSystem(preferredSystem);

}, [Salary, PrerequisiteIncome, ProfitIncome, OtherIncome, HRA, LTA, OtherExemptedAllowances, ProfessionalTax, RentedhomeInterestPaid, RentedrentReceived, RentedmunicipalTax1, DeemedhomeInterestPaid, DeemedrentReceived, DeemedmunicipalTax1, RentedHouseIncome, DeemdedHouseIncome, BasicDeductions, Medical, EducationalLoan, Nps, Deposits, Charity, handleChange, formData, NewFinalTax, OldFinalTax]);


     const Token = localStorage.getItem("token");


  const handleHousingLoanChange = (e) => {
    const inputValue = parseInt(e.target.value, 10) || 0;
    const limit = 150000;

    if (inputValue > limit) {
      toast.error("Keep the amount less than Rs 1,50,000");
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }

    handleChange({ HousingLoan: inputValue });
  };


const Link = ({ id, children, title }) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <a href=' ' style={{color: "black" , textDecoration: "none"}}>{children}</a>
  </OverlayTrigger>
);

    const handleGenderChange = (e) => {
      handleChange({ Gender: e.target.value });
    };

    const handleMarriedChange = (e) => {
      handleChange({ MaritalStatus: e.target.value });
    };

// const updateName = () => {
//   setName(`${FirstName} ${MiddleName} ${LastName}`);
// };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
      e.preventDefault();
      setShow(true);
    };

async function onSubmit(e) {
  e.preventDefault();
  if (isCheckboxChecked) {
    try {
      const response = await axios.post(
        "http://localhost:8000/policy/oldreign",
        {
          Token,
          formData,
          OldFinalTax,
          OldFinalCess,
          NewFinalTax,
          NewFinalCess,
          PreferredSystem,
        }
      );
      console.log(response.data); // Log the response data
      toast.success("Data is saved. You will be redirected in few seconds");
    } catch (err) {
      if (err.response) {
        console.error("Response Error:", err.response.data);
      } else if (err.request) {
        console.error("Request Error:", err.request);
      } else {
        console.error("Error:", err.message);
      }
      toast.error("Try again after sometime");
    }
  } else {
    toast.warning("Please verify the information before submitting.");
  }
}


  return (
    <section id="form-filling">
      <div className="personalInfo">
        <h1 className="formTitle">Personal Information</h1>
        <hr style={{ marginBottom: 20 }} />
        <Form onSubmit={onSubmit}>
          <Accordion defaultActiveKey="0" flush alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="iconDiv">
                  <FaRegCircleUser style={{ height: "2em", width: "2em" }} />
                  <div className="HeaderMainDiv">
                    <h2 className="AccordionMainHeading">
                      {" "}
                      Permanent Information{" "}
                    </h2>
                    <p className="accordionSubHeader">
                      Please provide all info as per your government identity
                      documents(PAN, Aadhaar etc.)
                    </p>
                  </div>
                </div>
              </Accordion.Header>
              <AccordionBody>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="formGridEmail">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Name *"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={FirstName}
                        placeholder="First Name "
                        onChange={(e) => {
                          handleChange({ FirstName: e.target.value });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Middle Name *"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={MiddleName}
                        placeholder="Middle Name"
                        onChange={(e) => {
                          handleChange({ MiddleName: e.target.value });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Last Name *"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={LastName}
                        placeholder="Last Name"
                        onChange={(e) => {
                          handleChange({ LastName: e.target.value });
                        }}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Form.Group
                  as={Col}
                  className="mb-3"
                  md="6"
                  controlId="formGridEmail"
                >
                  <Form.Label>Date Of Birth *</Form.Label>
                  <Form.Control
                    type="text"
                    value={DateOfBirth}
                    placeholder="DD/MM/YYYY"
                    onChange={(e) => {
                      handleChange({ DateOfBirth: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  className="mb-3"
                  controlId="formGridEmail"
                >
                  <Form.Label>Father Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={FatherName}
                    placeholder=""
                    onChange={(e) => {
                      handleChange({ FatherName: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Label>Gender *</Form.Label>
                  <Form.Check
                    style={{ marginLeft: "16px" }}
                    inline
                    type="radio"
                    label="Male"
                    value="male"
                    checked={Gender === "male"}
                    onChange={handleGenderChange}
                  />
                  <Form.Check
                    inline
                    style={{ marginLeft: "16px" }}
                    type="radio"
                    label="Female"
                    value="female"
                    checked={Gender === "female"}
                    onChange={handleGenderChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Label>Marital Status *</Form.Label>
                  <Form.Check
                    style={{ marginLeft: "16px" }}
                    inline
                    type="radio"
                    label="Married"
                    value="Married"
                    checked={MaritalStatus === "Married"}
                    onChange={handleMarriedChange}
                  />
                  <Form.Check
                    inline
                    style={{ marginLeft: "16px" }}
                    type="radio"
                    label="Not Married"
                    value="Not Married"
                    checked={MaritalStatus === "Not Married"}
                    onChange={handleMarriedChange}
                  />

                  <Form.Check
                    inline
                    style={{ marginLeft: "16px" }}
                    type="radio"
                    label="Not share"
                    value="Not share"
                    checked={MaritalStatus === "Not share"}
                    onChange={handleMarriedChange}
                  />
                </Form.Group>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>

          <Accordion defaultActiveKey="0" flush alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="iconDiv">
                  <FaRegAddressCard style={{ height: "2em", width: "2em" }} />
                  <div className="HeaderMainDiv">
                    <h2 className="AccordionMainHeading">
                      {" "}
                      Identification & Contact details{" "}
                    </h2>
                    <p className="accordionSubHeader">
                      Please provide all info as per your government identity
                      documents(PAN, Aadhaar etc.)
                    </p>
                  </div>
                </div>
              </Accordion.Header>
              <AccordionBody>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formGridEmail">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Aadhar Card Number"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={AadharNo}
                        onChange={(e) => {
                          handleChange({ AadharNo: e.target.value });
                        }}
                        placeholder="Aadhar Card Number"
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="PanCard Number"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={PanCard}
                        onChange={(e) => {
                          handleChange({ PanCard: e.target.value });
                        }}
                        placeholder="PanCard Number"
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="mb-3"
                    md="6"
                    controlId="formGridEmail"
                  >
                    <Form.Label>Mobile Number *</Form.Label>
                    <Form.Control
                      type="text"
                      value={MobileNo}
                      placeholder="DD/MM/YYYY"
                      onChange={(e) => {
                        handleChange({ MobileNo: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="mb-3"
                    md="6"
                    controlId="formGridEmail"
                  >
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      value={Email}
                      placeholder="DD/MM/YYYY"
                      onChange={(e) => {
                        handleChange({ Email: e.target.value });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    placeholder="Flat No, Building Name"
                    type="text"
                    value={Address}
                    onChange={(e) => {
                      handleChange({ Address: e.target.value });
                      if (sameAsAddress) {
                        handleChange({ PermanentAddress: e.target.value });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label style={{ display: "flex", alignItems: "center" }}>
                    Permanant Address{" "}
                    <span style={{ marginLeft: "10px" }}>
                      <Link
                        id="t-2"
                        title="Select If permanent address is the same"
                      >
                        <CheckBox
                          onChange={(e) => {
                            setSameAsAddress(e.target.checked);
                            if (e.target.checked) {
                              // Set PermanentAddress to be the same as Address
                              handleChange({ PermanentAddress: Address });
                            } else {
                              // Reset PermanentAddress if the checkbox is unchecked
                              handleChange({ PermanentAddress: "" });
                            }
                          }}
                          checked={sameAsAddress}
                        />
                      </Link>
                    </span>
                  </Form.Label>
                  <Form.Control
                    placeholder="locality, city"
                    type="text"
                    value={sameAsAddress ? Address : PermanentAddress}
                    onChange={(e) => {
                      handleChange({ PermanentAddress: e.target.value });
                    }}
                    disabled={sameAsAddress}
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={City}
                      onChange={(e) => {
                        handleChange({ City: e.target.value });
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State/UT</Form.Label>
                    <Form.Select
                      value={selectedState}
                      onChange={(e) => {
                        handleChange({ selectedState: e.target.value });
                      }}
                    >
                      {States.map(
                        (
                          state // Added parentheses and return statement
                        ) => (
                          <option key={state.id} value={state.name}>
                            {state.name}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="text"
                      value={PinCode}
                      onChange={(e) => {
                        handleChange({ PinCode: e.target.value });
                      }}
                    />
                  </Form.Group>
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>

          <hr style={{ marginBottom: 20 }} />
          <h1 className="formTitle">Employeers Information</h1>
          <hr style={{ marginBottom: 20 }} />

          <Accordion defaultActiveKey="0" flush alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="iconDiv">
                  <FaLaptopCode style={{ height: "2em", width: "2em" }} />
                  <div className="HeaderMainDiv">
                    <h2 className="AccordionMainHeading">
                      {" "}
                      Employer & TDS Details{" "}
                    </h2>
                    <p className="accordionSubHeader">
                      Please provide all info as per your government documents
                    </p>
                  </div>
                </div>
              </Accordion.Header>

              <AccordionBody>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Name of Employer</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    value={employerName}
                    onChange={(e) =>
                      handleChange({ employerName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address of the Employer</Form.Label>
                  <Form.Control
                    placeholder="Flat No, Building Name"
                    type="text"
                    value={employerAddress}
                    onChange={(e) =>
                      handleChange({ employerAddress: e.target.value })
                    }
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>PAN Of the Deductor</Form.Label>
                    <Form.Control
                      value={employerPanNumber}
                      onChange={(e) => {
                        handleChange({ employerPanNumber: e.target.value });
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      TAN Of the Deductor
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link id="t-2" title="Click To view a sample">
                          <IoInformationCircleOutline onClick={handleShow} />
                        </Link>
                        <ImageModal
                          src="https://assets1.cleartax-cdn.com/cleartax/images/1629801946_employerdetails.png"
                          headerTitle="Ensure that you add the Employer Name and Employer TAN from your form 16"
                          show={show}
                          handleClose={handleClose}
                        />
                      </span>
                    </Form.Label>
                    <Form.Control
                      value={tanNumber}
                      onChange={(e) =>
                        handleChange({ tanNumber: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Employee Reference No
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="provided by the Employer
(If available)"
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>

                    <Form.Control
                      value={employeeReferenceNo}
                      onChange={(e) =>
                        handleChange({ employeeReferenceNo: e.target.value })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Period With Employer (yyyy).</Form.Label>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="From"
                      className="mb-3"
                    >
                      <Form.Control placeholder="From" />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="To"
                      className="mb-3"
                    >
                      <Form.Control placeholder="To (yyyy)" />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Assessment Year</Form.Label>
                    <Form.Control
                      placeholder="2022-2023"
                      value={Year}
                      onChange={(e) => {
                        handleChange({ Year: e.target.value });
                      }}
                    />
                    <Form.Label style={{ marginTop: "20px" }}>
                      Total tax deducted BY Employer *
                    </Form.Label>
                    <Form.Control
                      placeholder=""
                      value={TaxDeducted}
                      onChange={(e) => {
                        handleChange({
                          TaxDeducted: parseInt(e.target.value, 10) || 0,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>

          {/* Income Info */}
          <hr style={{ marginBottom: 20 }} />
          <h1 className="formTitle">Income Information</h1>
          <hr style={{ marginBottom: 20 }} />
          <Accordion defaultActiveKey="0" flush alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="iconDiv">
                  <TbPigMoney style={{ height: "2em", width: "2em" }} />
                  <div className="HeaderMainDiv">
                    <h2 className="AccordionMainHeading"> Salary BreakUp </h2>
                    <p className="accordionSubHeader">
                      Please provide all info as per your Salary Slip
                    </p>
                  </div>
                </div>
              </Accordion.Header>

              <AccordionBody>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Income From Salary
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="Salary before reducing HRA, LTA, standard deductions & professional tax. 
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={Salary}
                      onChange={(e) =>
                        handleChange({
                          Salary: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Perquisites under section 17(2)*
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link id="t-2" title="Click To view sample ">
                          <IoInformationCircleOutline
                            onClick={(e) => {
                              e.preventDefault();
                              setShowIncomeModal(!showIncomeModal);
                            }}
                          />
                        </Link>
                        <ImageModal
                          src="https://assets1.cleartax-cdn.com/cleartax/images/1629905376_172form12ba.png"
                          headerTitle="These are the benefits given to you by your employer, in addition to wages or salary. These typically include the following:"
                          show={showIncomeModal}
                          handleClose={() => setShowIncomeModal(false)}
                        />
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={PrerequisiteIncome}
                      onChange={(e) =>
                        handleChange({
                          PrerequisiteIncome: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Profits in lieu of salary under section 17(3)
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link id="t-2" title="Click To view sample ">
                          <IoInformationCircleOutline
                            onClick={(e) => {
                              e.preventDefault();
                              setShowProfitsModal(!showProfitsModal);
                            }}
                          />
                        </Link>
                        <ImageModal
                          src="https://assets1.cleartax-cdn.com/cleartax/images/1629905424_173form12ba.png"
                          headerTitle="These are the benefits given to you by your employer, in addition to wages or salary. These typically include the following:"
                          show={ProfitIncome}
                          handleClose={() => setShowProfitsModal(false)}
                        />
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={ProfitIncome}
                      onChange={(e) =>
                        handleChange({
                          PrerequisiteIncome: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0" flush alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="iconDiv">
                  <GiReceiveMoney style={{ height: "2em", width: "2em" }} />
                  <div className="HeaderMainDiv">
                    <h2 className="AccordionMainHeading">
                      {" "}
                      Exempt allowances under section 10*{" "}
                    </h2>
                    <p className="accordionSubHeader">
                      Please provide all info as per your Salary Slip
                    </p>
                  </div>
                </div>
              </Accordion.Header>

              <AccordionBody>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      House Rent Exemption
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="Salaried individuals living in rented houses (paying rent) can claim the House Rent Allowance (HRA).
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={HRA}
                      onChange={(e) =>
                        handleChange({
                          HRA: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Leave Travel Allowance (LTA) Exemption
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="allowance which is paid to the employee by the employer when the former is traveling with their family or alone
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={LTA}
                      onChange={(e) =>
                        handleChange({
                          LTA: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Other Exempt allowances
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="All types of Exemption given by the Employer
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={OtherExemptedAllowances}
                      onChange={(e) =>
                        handleChange({
                          OtherExemptedAllowances:
                            parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Professional tax under section 16(iii)
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="individuals employed in various professions, trades, and employments, typically to fund local government activities.
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={ProfessionalTax}
                      onChange={(e) =>
                        handleChange({
                          ProfessionalTax: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Income Chargeble on head Salary
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="individuals employed in various professions, trades, and employments, typically to fund local government activities.
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control disabled placeholder="0" value={HeadIncome} />
                  </Form.Group>
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>

          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="iconDiv">
                  <BsFillHouseAddFill style={{ height: "2em", width: "2em" }} />
                  <div className="HeaderMainDiv">
                    <h2 className="AccordionMainHeading">
                      {" "}
                      Rental Income or House Property
                    </h2>
                    <p className="accordionSubHeader">
                      lease add the details if you earned rent from your house
                      property or paid interest on housing loan
                    </p>
                  </div>
                </div>
              </Accordion.Header>

              <AccordionBody>
                <h5>Self-occupied House Property</h5>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Interest paid on loan for this house property
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="If you have a housing loan against a house you live in then you can claim a tax deduction of upto Rs. 2,00,000.
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={OwnHouseIncome}
                      onChange={(e) =>
                        handleChange({
                          OwnHouseIncome: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <div
                  style={{
                    Display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "1rem",
                  }}
                >
                  <h5>Rental Property</h5>
                  <p>
                    30% Deduction under section 24 is automatically provided for
                    by our software in Tax Calculation.
                  </p>
                </div>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Annual Rent Received by you
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="Please specify the portion of the rent received by you if the property is co-owned.
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={RentedrentReceived}
                      onChange={(e) =>
                        setRentedRentReceived(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Municipal Tax
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="Specifying House tax you paid reduces your tax liability
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={RentedmunicipalTax1}
                      onChange={(e) =>
                        setRentedMunicipalTax1(
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Interest paid on loan for this house property
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="If you have a housing loan against a house you live in then you can claim a tax deduction of upto Rs. 2,00,000.
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={RentedhomeInterestPaid}
                      onChange={(e) =>
                        setRentedHomeInterestPaid(
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                    />
                  </Form.Group>
                </Row>
                <div
                  style={{
                    Display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "1rem",
                  }}
                >
                  <h5>Deemed Let Out Property</h5>
                  <p>
                    30% Deduction under section 24 is automatically provided for
                    by our software in Tax Calculation.
                  </p>
                </div>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Estimated Annual Rent Receivable
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="Please specify the portion of the rent received by you if the property is co-owned.
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={DeemedrentReceived}
                      onChange={(e) =>
                        setDeemedRentReceived(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Municipal Tax
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="Specifying House tax you paid reduces your tax liability
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={DeemedmunicipalTax1}
                      onChange={(e) =>
                        setDeemedMunicipalTax1(
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Interest paid on loan for this house property
                      <span
                        style={{ marginLeft: "10px", alignContent: "center" }}
                      >
                        <Link
                          id="t-2"
                          title="If you have a housing loan against a house you live in then you can claim a tax deduction of upto Rs. 2,00,000.
                    "
                        >
                          <IoInformationCircleOutline />
                        </Link>
                      </span>
                    </Form.Label>
                    <Form.Control
                      placeholder="0"
                      value={DeemedhomeInterestPaid}
                      onChange={(e) =>
                        setDeemedHomeInterestPaid(
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                    />
                  </Form.Group>
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>

          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="iconDiv">
                  <FaMoneyBills style={{ height: "2em", width: "2em" }} />
                  <div className="HeaderMainDiv">
                    <h2 className="AccordionMainHeading">
                      {" "}
                      Other Sources of Income{" "}
                    </h2>
                    <p className="accordionSubHeader">
                      Please provide all info
                    </p>
                  </div>
                </div>
              </Accordion.Header>

              <AccordionBody>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label style={{ display: "flex", alignItems: "center" }}>
                    Other Income
                    <span
                      style={{ marginLeft: "10px", alignContent: "center" }}
                    >
                      <Link
                        id="t-2"
                        title="Includes taxable freelancing income or any other taxable income
                    "
                      >
                        <IoInformationCircleOutline />
                      </Link>
                    </span>
                  </Form.Label>
                  <Form.Control
                    placeholder="0"
                    value={OtherIncome}
                    onChange={(e) =>
                      handleChange({
                        OtherIncome: parseInt(e.target.value, 10) || 0,
                      })
                    }
                  />
                </Form.Group>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>

          {/* All Tax Deductions */}
          <hr style={{ marginBottom: 20 }} />
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
                  handleChange(parseInt(e.target.value, 10) || 0)
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
                  handleChange(parseInt(e.target.value, 10) || 0)
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
                  handleChange(parseInt(e.target.value, 10) || 0)
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
                  handleChange(parseInt(e.target.value, 10) || 0)
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
                  handleChange(parseInt(e.target.value, 10) || 0)
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
                  handleChange(parseInt(e.target.value, 10) || 0)
                }
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Have you verified the Information"
              onChange={(e) => {
                setIsCheckboxChecked(e.target.checked);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!isCheckboxChecked}>
            Submit
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default FormFilling;