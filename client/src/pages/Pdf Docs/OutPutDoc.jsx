import React,{useEffect,useState,useRef} from 'react'
import "./OutPutDoc.css"
import { useNavigate } from 'react-router-dom';
import ThumbsUp from "../../assets/thumbsup.svg";
import { toast } from "react-toastify";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  IoMailOpenOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";

const generateRandomNumber = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

// Function to get the current date in the format "DD MMM YYYY"
const getCurrentDate = () => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

function OutPutDoc() {
  const pdfRef = useRef(null);

    const [invoiceNumber, setInvoiceNumber] = useState(() => {
      // Get the stored invoice number from local storage, or generate a new one
      const storedInvoiceNumber = localStorage.getItem("invoiceNumber");
      return storedInvoiceNumber
        ? parseInt(storedInvoiceNumber, 10)
        : generateRandomNumber();
    });
    const invoiceDate = getCurrentDate();

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
     }, [Token]);

     useEffect(() => {
       localStorage.setItem("invoiceNumber", invoiceNumber.toString());
     }, [invoiceNumber]);
     

     async function onclickDownload(){
      var doc = new jsPDF("portrait", "pt", "a4");

      const data = await html2canvas(document.querySelector("#OutPutSec"));
      const img = data.toDataURL("image/png"); 
      const imgProperties = doc.getImageProperties(img); 
      const pdfWidth = doc.internal.pageSize.getWidth() - 10;
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
     const topPadding = 20;
     const sidePadding = 10;

     doc.addImage(img, "PNG", sidePadding, topPadding, pdfWidth, pdfHeight);
      doc.save("taxreport-" + (!Token ? "125420" : Token) + ".pdf");
     }

  return (
    <>
      <div className="Button-Doc-Group">
        <button className="buttons-group " onClick={refreshPage}>
          Click To Refresh
        </button>
        <button className="buttons-group" onClick={onclickDownload}>
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

      <section id="OutPutSec" ref={pdfRef}>
        <div className="invoice-1">
          <div className="invoice-headar">
            <div className="row g-0">
              <div className="col-sm-6 invoice_heading">
                <div className="logo"></div>
                <h1 className="heading">TaxSarthi</h1>
                <div className="logo"></div>
              </div>
              <div className="col-sm-6 invoice-id">
                <div className="info">
                  <h1 className="color-white inv-header-1">Tax Invoice</h1>
                  <p className="color-white mb-1">
                    Invoice Number <span>#{invoiceNumber}</span>
                  </p>
                  <p className="color-white mb-0">
                    Invoice Date <span>{invoiceDate}</span>
                  </p>
                  <p className="color-white mb-1">
                    AY <span>2023-24</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="MainInfoDiv">
          <div className="PersonDiv">
            <h4 className="inv-title-1">Personal Details</h4>
            <h2 className="name mb-10">Jhon Smith</h2>
            <p>
              <span>
                <strong>Email: </strong>email
              </span>
            </p>
            <p>
              <span>
                <strong>Mobile No: </strong>Mobile No
              </span>
            </p>
            <p>
              <span>
                <strong>Aadhar Card No: </strong>
                {userData ? userData.AadharNo : "N/A"}
              </span>
            </p>
            <p>
              <span>
                <strong>Pan Card: </strong> Pan Card
              </span>
            </p>
          </div>
          <div className="EmployerInfo">
            <h4 className="inv-title-1">Employer Details</h4>
            <h2 className="name mb-10">Employer Name</h2>
            <p>
              <span>
                <strong>employerAddress: </strong> The employerAddress{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>employerPanNumber: </strong> employerPanNumber{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>tanNumber: </strong> tanNumber{" "}
              </span>
            </p>
            <p>
              <span>
                <strong>employeeReferenceNo: </strong> employeeReferenceNo{" "}
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

        <div className="invoice-footer">
          <div class="invoice-bottom">
            <div class="row">
              <div class="col-lg-6 col-md-8 col-sm-7">
                <div class="mb-30 dear-client">
                  <h3 class="inv-title-1" style={{ color: "#4d7298" }}>
                    Terms & Conditions
                  </h3>
                  <p style={{ color: "rgb(131, 124, 124)" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been typesetting
                    industry. Lorem Ipsum
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="invoice-contact clearfix">
            <div class="row g-0">
              <div class="col-lg-9 col-md-11 col-sm-12">
                <div class="contact-info">
                  <a href="tel:+55-4XX-634-7071">
                    <span>
                      <IoCallOutline
                        style={{
                          paddingBottom: "2px",
                          width: "1.2em",
                          height: "1.2em",
                        }}
                      />
                    </span>{" "}
                    +00 123 647 840
                  </a>
                  <a href="tel:info@taxsarthi.com">
                    <span>
                      <IoMailOpenOutline
                        style={{
                          paddingBottom: "2px",
                          width: "1.2em",
                          height: "1.2em",
                        }}
                      />
                    </span>{" "}
                    info@taxsarthi.com
                  </a>
                  <a href="tel:info@themevessel.com" class="mr-0 d-none-580">
                    <span>
                      <IoLocationOutline
                        style={{
                          paddingBottom: "2px",
                          width: "1.2em",
                          height: "1.2em",
                        }}
                      />
                    </span>{" "}
                    169 Mumbai, India
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OutPutDoc