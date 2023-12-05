/* eslint-disable no-unused-expressions */
import React,{useState,useEffect} from 'react'
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
const [FirstName, setFirstName] = useState("");
const [MiddleName, setMiddleName] = useState("");
const [LastName, setLastName] = useState("");
const [Name, setName] = useState("");
const [AadharNo, setAadharNo] = useState();
const [PanCard, setPanCard] = useState("");
const [Address, setAddress] = useState("");
const [PermanentAddress, setPermanentAddress] = useState("");
const [City, setCity] = useState("");
const [selectedState, setSelectedState] = useState("");
const [PinCode, setPinCode] = useState("");

//Employers details
const [employerName, setEmployerName] = useState("");
const [employerAddress, setEmployerAddress] = useState("");
const [employerPanNumber, setemployerPanNumber] = useState("");
const [tanNumber, setTanNumber] = useState("");
const [employeeReferenceNo, setEmployeeReferenceNo] = useState("");
const [Year, setYear] = useState("");

 //Checkboxes
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [sameAsAddress, setSameAsAddress] = useState(false);

  //Income details
  const [Salary, setSalary] = useState(0);
  const [RentedIncome, setRentedIncome] = useState(0);
  const [OtherIncome, setOtherIncome] = useState(0);
  const [ExemptedAllowances, setExemptedAllowances] = useState(0);
  const[Home,setHome] = useState(0);

  //Deductions Deatils
  const [BasicDeductions, setBasicDeductions] = useState(0); //80c
  const [Medical, setMedical] = useState(0); //80d
  const [EducationalLoan, setEducationalLoan] = useState(0); //80e
  const [Nps, setNps] = useState(0); //80ccd
  const [Deposits, setDeposits] = useState(0); //80tta
  const [Charity, setCharity] = useState(0); //80g
  const [HousingLoan, setHousingLoan] = useState(0); //80eea

    const [finalTax, setFinalTax] = useState();
    const [cess,setCess] = useState(0);

useEffect(() => {
  // Function to calculate final tax
  const StandardDeductions = 50000;
  const calculateFinalTax = () => {
    const totalIncome =
      Salary + RentedIncome + OtherIncome - ExemptedAllowances;
    const totalDeductions =
      BasicDeductions +
      Medical +
      EducationalLoan +
      Nps +
      Deposits +
      Charity +
      HousingLoan;
    const taxableIncome = totalIncome - StandardDeductions - totalDeductions;

    const calculatedTax = calculateOldRegimeTax(taxableIncome);

    setFinalTax(calculatedTax);
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
      setCess(totalTax * 0.04);
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

    const finalTax = totalTax + calculateCess(totalTax);

    return finalTax;
  };

  // Call the calculateFinalTax function when any of the inputs change
  calculateFinalTax();
}, [
  Salary,
  RentedIncome,
  OtherIncome,
  ExemptedAllowances,
  BasicDeductions,
  Medical,
  EducationalLoan,
  Nps,
  Deposits,
  Charity,
  HousingLoan,
]);


const Link = ({ id, children, title }) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <a href=' ' style={{color: "black" , textDecoration: "none"}}>{children}</a>
  </OverlayTrigger>
);

const updateName = () => {
  setName(`${FirstName} ${MiddleName} ${LastName}`);
};

async function onSubmit(e) {
  e.preventDefault();
  if (isCheckboxChecked) {
    try {
      const response = await axios.post(
        "http://localhost:8000/policy/oldreign",
        {
          // Personal Info
          FirstName,
          MiddleName,
          LastName,
          Name,
          AadharNo,
          PanCard,
          Address,
          PermanentAddress,
          City,
          selectedState,
          PinCode,

          // Employers Info
          employerName,
          employerAddress,
          employerPanNumber,
          tanNumber,
          employeeReferenceNo,
          Year,

          // Income Info
          Salary,
          RentedIncome,
          OtherIncome,
          ExemptedAllowances,
          Home,

          // Deductions
          BasicDeductions,
          Medical,
          EducationalLoan,
          Nps,
          Deposits,
          Charity,
          HousingLoan,

          // Amounts
          finalTax,
          cess,
        }
      );

      // Handle success, if needed
      localStorage.setItem("AadharNo", AadharNo);
      console.log(response.data); // Log the response data
      toast.success("Data is saved. You will be redirected in few seconds");
    } catch (err) {
      toast.error("Try again after sometime");
      console.log(err);
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
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={FirstName}
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    updateName();
                  }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Middle Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={MiddleName}
                  placeholder="Middle Name"
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                    updateName();
                  }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={LastName}
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    updateName();
                  }}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>
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
                    setAadharNo(e.target.value);
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
                    setPanCard(e.target.value);
                  }}
                  placeholder="PanCard Number"
                />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="Flat No, Building Name"
              type="text"
              value={Address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label style={{ display: "flex", alignItems: "center" }}>
              Permanant Address{" "}
              <span style={{ marginLeft: "10px" }}>
                <Link id="t-2" title="Select If permanent address is the same">
                  <CheckBox
                    onChange={(e) => {
                      setSameAsAddress(e.target.checked);
                      if (e.target.checked) {
                        setPermanentAddress(Address); // Set permanent address to be the same as address
                      } else {
                        setPermanentAddress(""); // Reset permanent address if the checkbox is unchecked
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
                setPermanentAddress(e.target.value);
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
                  setCity(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State/UT</Form.Label>
              <Form.Select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                }}
              >
                {States.map(
                  (
                    state // Added parentheses and return statement
                  ) => (
                    <option key={state.id} value={state.id}>
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
                  setPinCode(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          <hr style={{ marginBottom: 20 }} />
          <h1 className="formTitle">Employeers Information</h1>
          <hr style={{ marginBottom: 20 }} />
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Name of Employer</Form.Label>
            <Form.Control
              placeholder="Name"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address of the Employer</Form.Label>
            <Form.Control
              placeholder="Flat No, Building Name"
              type="text"
              value={employerAddress}
              onChange={(e) => setEmployerAddress(e.target.value)}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>PAN Of the Deductor</Form.Label>
              <Form.Control
                value={employerPanNumber}
                onChange={(e) => {
                  setemployerPanNumber(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>TAN Of the Deductor</Form.Label>
              <Form.Control
                value={tanNumber}
                onChange={(e) => setTanNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label style={{ display: "flex", alignItems: "center" }}>
                Employee Reference No
                <span style={{ marginLeft: "10px", alignContent: "center" }}>
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
                onChange={(e) => setEmployeeReferenceNo(e.target.value)}
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
                  setYear(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          {/* Income Info */}
          <hr style={{ marginBottom: 20 }} />
          <h1 className="formTitle">Income Information</h1>
          <hr style={{ marginBottom: 20 }} />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label style={{ display: "flex", alignItems: "center" }}>
                Income From Salary
                <span style={{ marginLeft: "10px", alignContent: "center" }}>
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
                onChange={(e) => setSalary(parseInt(e.target.value, 10) || 0)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label style={{ display: "flex", alignItems: "center" }}>
                Rental Income
                <span style={{ marginLeft: "10px", alignContent: "center" }}>
                  <Link
                    id="t-2"
                    title="Annual rent received on rented property
                    "
                  >
                    <IoInformationCircleOutline />
                  </Link>
                </span>
              </Form.Label>
              <Form.Control
                placeholder="0"
                value={RentedIncome}
                onChange={(e) =>
                  setRentedIncome(parseInt(e.target.value, 10) || 0)
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label style={{ display: "flex", alignItems: "center" }}>
                Other Income
                <span style={{ marginLeft: "10px", alignContent: "center" }}>
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
                  setOtherIncome(parseInt(e.target.value, 10) || 0)
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label style={{ display: "flex", alignItems: "center" }}>
                Exempt Allowances
                <span style={{ marginLeft: "10px", alignContent: "center" }}>
                  <Link
                    id="t-2"
                    title="HRA, LTA, Professional Tax and any Other Exemptions 
                    "
                  >
                    <IoInformationCircleOutline />
                  </Link>
                </span>
              </Form.Label>
              <Form.Control
                placeholder="0"
                value={ExemptedAllowances}
                onChange={(e) =>
                  setExemptedAllowances(parseInt(e.target.value, 10) || 0)
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label style={{ display: "flex", alignItems: "center" }}>
                Home Loans
                <span style={{ marginLeft: "10px", alignContent: "center" }}>
                  <Link
                    id="t-2"
                    title="Interest paid on loans of owned and rented properties
                    "
                  >
                    <IoInformationCircleOutline />
                  </Link>
                </span>
              </Form.Label>
              <Form.Control
                placeholder="0"
                value={Home}
                onChange={(e) => setHome(parseInt(e.target.value, 10) || 0)}
              />
            </Form.Group>
          </Row>
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
                  setBasicDeductions(parseInt(e.target.value, 10) || 0)
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
                onChange={(e) => setMedical(parseInt(e.target.value, 10) || 0)}
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
                  setEducationalLoan(parseInt(e.target.value, 10) || 0)
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
                onChange={(e) => setNps(parseInt(e.target.value, 10) || 0)}
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
                onChange={(e) => setDeposits(parseInt(e.target.value, 10) || 0)}
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
                onChange={(e) => setCharity(parseInt(e.target.value, 10) || 0)}
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
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const limit = 150000;

                  parseInt(inputValue, 10) > limit
                    ? (toast.error("Keep the amount less than Rs 1,50,000"),
                      (e.target.style.borderColor = "red"),
                      setHousingLoan(e.target.value))
                    : ((e.target.style.borderColor = ""),
                      setHousingLoan(parseInt(e.target.value, 10) || 0));
                }}
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