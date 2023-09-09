import React from "react";
import "./header.css";

function Header() {
  return (
    <section className="header">
      <nav>
        <div className="nav-logo">TaxSarthi</div>
        <div className="nav-contents">
          <ul>
            <li>
              <a href="/">Pricing +</a>
              <ul>
                <li>
                  <a href="#">Something</a>
                </li>
                <li>
                  <a href="#">Something</a>
                </li>
                <li>
                  <a href="#">Something</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/">About +</a>
              <ul>
                <li>
                  <a href="#">Something</a>
                </li>
                <li>
                  <a href="#">Something</a>
                </li>
                <li>
                  <a href="#">Something</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/">Contact +</a>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Socials</a>
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
