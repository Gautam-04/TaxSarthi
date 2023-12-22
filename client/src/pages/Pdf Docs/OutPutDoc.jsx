import React,{useEffect,useState} from 'react'
import "./OutPutDoc.css"
import { useNavigate } from 'react-router-dom';
import ThumbsUp from "../../assets/thumbsup.svg";
import { toast } from "react-toastify";
import axios from "axios";

function OutPutDoc() {

  const amount1 = 100;
  const amount2 = 80;

  const navigate = useNavigate();

   function refreshPage() {
     window.location.reload(false);
   }

        const Token = localStorage.getItem("token");
        const [userData, setUserData] = useState(null);

     useEffect(() => {
       axios
         .post("https://taxsaarthi.onrender.com/policy/oldbody", { Token })
         .then((result) => {
           console.log(result.data);
           setUserData(result.data);
         })
         .catch((error) => {
           toast.error("There was an error loading the data");
         });
     }, []);

  return (
    <>
      <div className="Button-Doc-Group">
        <button className="buttons-group" onClick={refreshPage}>
          Click To Refresh
        </button>
        <button className="buttons-group" onClick={() => {}}>
          Download The Report
        </button>
        <button
          className="buttons-group"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
        <button
          className="buttons-group"
          onClick={() => {
            navigate("/login");
          }}
        >
          Back
        </button>
      </div>
      <hr style={{ marginBottom: 20 }} />
      <section id="OutPutSec">
        <div className="headingName">
          <h1>{userData?.Name}</h1>
          <h1 className="AY">AY: 2023-24</h1>
        </div>
        <div className="MainInfoDiv">
          <div className="PersonDiv">
            <p>
              <span>
                <strong>Address:</strong> The Address{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>Email:</strong> email{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>Mobile No:</strong> Mobile No{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>Aadhar Card No</strong>
                {userData ? userData.AadharNo : "N/A"}
              </span>
            </p>
            <p>
              <span>
                <strong>Pan Card:</strong> Pan Card{" "}
              </span>
            </p>
          </div>
          <div className="EmployerInfo">
            <h1>Employers Name: </h1>
            <p>
              <span>
                <strong>employerAddress:</strong> The employerAddress{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>employerPanNumber:</strong> employerPanNumber{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>tanNumber:</strong> tanNumber{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>employeeReferenceNo:</strong> employeeReferenceNo{" "}
              </span>
            </p>
          </div>
        </div>
        <hr style={{ marginBottom: 20 }} />

        <table className="tr-row">
          <tr>
            <td>
              <strong>Date Of Birth</strong>
            </td>
            <td>
              <span>12/45/2004</span>
            </td>

            <td>
              <strong>Status:</strong>
            </td>
            <td>
              <span>Individual</span>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Father's Name</strong>
            </td>
            <td>
              <span>xyz</span>
            </td>
            <td>
              <strong>Residential Status:</strong>
            </td>
            <td>
              <span>Resident</span>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Bank A/C no.:</strong>
            </td>
            <td>
              <span>45784</span>
            </td>
            <td>
              <strong>Gender:</strong>
            </td>
            <td>
              <span>male</span>
            </td>
          </tr>
          <tr>
            <td>
              <strong>E-filing Status</strong>
            </td>
            <td>
              <span>-</span>
            </td>
            <td>
              <strong>Selected tax regime</strong>
            </td>
            <td>
              <span>-</span>
            </td>
          </tr>
        </table>
        <h3>Tax Summary</h3>
        <table className="TaxTable">
          <tbody className="taxBody">
            <tr>
              <td>
                <b>Salary</b>
              </td>
              <td></td>
              <td style={{ textAlign: "right" }}>Amount</td>
            </tr>
            <tr style={{ backgroundColor: "black", height: "2px" }}>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <b>Gross Total Income</b>
              </td>
              <td></td>
              <td style={{ textAlign: "right" }}>Amount</td>
            </tr>
            <tr>
              <td>
                <b>Total Deductions</b>
              </td>
              <td style={{ textAlign: "right" }}>Amount</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td style={{ textAlign: "center" }}>
                Old Regime
                {amount1 < amount2 && (
                  <img
                    src={ThumbsUp}
                    alt="random.png"
                    style={{
                      width: "40px",
                      transform: "translateX(30%)",
                    }}
                  />
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                New Regime
                {amount2 < amount1 && (
                  <img
                    src={ThumbsUp}
                    alt="random.png"
                    style={{
                      width: "40px",
                      transform: "translateX(30%)",
                    }}
                  />
                )}
              </td>
            </tr>
            <tr style={{ backgroundColor: "black", height: "2px" }}>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <b>Total Tax Payable</b>
              </td>
              <td style={{ textAlign: "center" }}>Amount</td>
              <td style={{ textAlign: "center" }}>Amount</td>
            </tr>
          </tbody>
        </table>

        <h3>Income Tax Summary</h3>
      </section>
    </>
  );
}

export default OutPutDoc