import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <section className="header">
      <nav>
        <div className="nav-logo">
          <a
            href=" "
            onClick={() => {
              navigate("/");
            }}
          >
            TaxSarthi
          </a>
        </div>
        <div className="nav-contents">
          <ul>
            <li>
              <li>Taxes</li>
              <ul>
                <li
                  onClick={() => {
                    navigate("/taxes/about-taxes");
                  }}
                >
                  About Taxes
                </li>
                <li
                  onClick={() => {
                    navigate("/taxes/tax-basics");
                  }}
                >
                  Tax Basics
                </li>
                <li
                  onClick={() => {
                    navigate("/taxes/other-taxes");
                  }}
                >
                  Other Taxes
                </li>
              </ul>
            </li>
            <li>
              <li>Savings</li>
              <ul>
                <li
                  onClick={() => {
                    navigate("/savings/smart-savings");
                  }}
                >
                  Smart Savings
                </li>
                <li
                  onClick={() => {
                    navigate("/savings/tax-saving-investment");
                  }}
                >
                  Tax Saving Investment
                </li>
                <li
                  onClick={() => {
                    navigate("/savings/deductions-benefits");
                  }}
                >
                  Deduction and Benefit
                </li>
              </ul>
            </li>
            <li>
              <li>Filing</li>
              <ul>
                <li>
                  <li
                    onClick={() => {
                      navigate("/filing/filing-your-taxes");
                    }}
                  >
                    Filing Your Taxes
                  </li>
                </li>
                <li>
                  <li
                    onClick={() => {
                      navigate("/filing/organizing-document");
                    }}
                  >
                    Organizing Documents
                  </li>
                </li>
              </ul>
            </li>
            <li>
              <li>Help</li>
              <ul>
                <li>
                  <li
                    onClick={() => {
                      navigate("/help/reponding-to-notice");
                    }}
                  >
                    Responding to Notice
                  </li>
                </li>
                <li>
                  <li
                    onClick={() => {
                      navigate("/help/disputes-resolution");
                    }}
                  >
                    Disputes And Resolution
                  </li>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
}

export default Header;
