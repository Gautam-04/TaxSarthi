import React, { useState } from "react";
import "./Docs.css";
import Stack from "react-bootstrap/Stack";
import Checkbox from "../../components/mis/CheckBox";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserProvider";

function Docs() {
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useUser();

  const [checkboxes, setCheckboxes] = useState({
    aadharCard: false,
    panCard: false,
    salarySlip: false,
    addressDocuments: false,
  });

  const handleCheckboxChange = (name) => {
    setCheckboxes({
      ...checkboxes,
      [name]: !checkboxes[name],
    });
  };

  const isAllChecked = () => {
    return (
      checkboxes.aadharCard &&
      checkboxes.panCard &&
      checkboxes.salarySlip &&
      checkboxes.addressDocuments
    );
  };

  

  function handleClick() {
    if (isAllChecked()) {
    alert("Please fill the form in one go or all progress will be lost");
      navigate("/form-filling");
    } else {
      alert("Please check all required checkboxes before proceeding.");
    }
  }

  return (
    <section className="docs-list">
      {user ? (
        <Stack gap={2} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
          <h3>Important Notices</h3>
          <ul>
            <li>
              Please ensure that all the information provided is accurate and up
              to date.
            </li>
            <li>
              Make sure to double-check the spelling and correctness of your
              personal details.
            </li>
            <li>
              Keep a copy of the completed form for your records before
              submission.
            </li>
            <li>
              If you encounter any technical issues while filling out the form,
              contact our support team immediately.
            </li>
          </ul>
          <h1>Documents Required:</h1>
          <Checkbox
            label="Aadhar Card"
            onChange={() => handleCheckboxChange("aadharCard")}
            checked={checkboxes.aadharCard}
          />
          <Checkbox
            label="Pan Card"
            onChange={() => handleCheckboxChange("panCard")}
            checked={checkboxes.panCard}
          />
          <Checkbox
            label="Salary Slip"
            onChange={() => handleCheckboxChange("salarySlip")}
            checked={checkboxes.salarySlip}
          />
          <Checkbox
            label="Address Documents"
            onChange={() => handleCheckboxChange("addressDocuments")}
            checked={checkboxes.addressDocuments}
          />
          <button
            className="button"
            onClick={handleClick}
            disabled={!isAllChecked()}
          >
            Next
          </button>
        </Stack>
      ) : (
        <div className="Docs-Login">
          <p className="Docs-Login-p">Please login to access this page.</p>
          <button className="Docs-Login-button" onClick={() => navigate("/login")}>Go to Home</button>
        </div>
      )}

      <div className="profile">
        {user && (
          <Dropdown fetchAgain={fetchAgain}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Profile
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  navigate("/profile");
                }}
              >
                My Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </section>
  );
}

export default Docs;
