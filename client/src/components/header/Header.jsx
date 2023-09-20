import React,{useState} from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" className="header" expanded={expanded}>
      <div className="container">
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="navbar-brand-text hover:text-white">GAUTAM RAI</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Taxes  +"
              menuVariant="light"
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/taxes/about-taxes");
                }}
              >
                About Taxes
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/taxes/tax-basics");
                }}
              >
                Tax Basics
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/taxes/other-taxes");
                }}
              >
                Other Taxes
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Savings  +"
              menuVariant="light"
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/savings/smart-savings");
                }}
              >
                Smart Savings
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/savings/tax-saving-investment");
                }}
              >
                Tax Saving Investment
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/savings/deductions-benefits");
                }}
              >
                Deduction And Benefits
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Filing  +"
              menuVariant="light"
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/filing/filing-your-taxes");
                }}
              >
                Filing Your Taxes
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/filing/organizing-document");
                }}
              >
                Organizing Documents
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Help  +"
              menuVariant="light"
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/help/reponding-to-notice");
                }}
              >
                Responding to Notice
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/help/disputes-resolution");
                }}
              >
                Disputes And Resolution
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
