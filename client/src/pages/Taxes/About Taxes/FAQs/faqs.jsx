import React from "react";
import "../AboutTaxes.css";
// import NoticeReasons from "../../../../assets/tax-notice-01.png";
// import SampleMail from "../../../../assets/tax-notice-02.png";

function FAQs() {
  return (
    <section className="blog-container">
      <div className="blog-header">
        <div className="blog-author">
          <div className="blog-author-profile">
            <img
              src="https://imgflip.com/s/meme/Cute-Cat.jpg"
              alt="goofy aah cat"
            />
          </div>
          <div className="blog-author-name">ChinmayDesai</div>
        </div>
        <div className="blog-date">12 July, 2023</div>
      </div>
      <hr />
      <div className="blog-title">Frequently Asked Questions</div>
      <hr />
      <div className="blog-content">
        <div className="content-section">
          <div className="content-subheading">
            What does the code EXC 001 mean in the income tax return notice?
          </div>
          <div className="content-paragraph">
            EXC-001 means that you have done a transaction that is beyond the
            permission of the&nbsp;
            <a
              href="https://tax2win.in/guide/income-tax-basics-comprehension-guide"
              target="blank"
            >
              Income Tax Act
            </a>
            . It is for cash transactions exceeding INR 10 lakh in a month
          </div>
        </div>
        <div className="content-section">
          <div className="content-subheading">
            Does a salaried person get an income tax department notice?
          </div>
          <div className="content-paragraph">
            Yes, a salaried person can also get an income tax notice. The&nbsp;
            <a
              href="https://tax2win.in/guide/income-tax-notice-us-143-1"
              target="blank"
            >
              notice u/s 143(1)
            </a>
            &nbsp;is an intimation that ITD sends to every taxpayer. However,
            you can receive other income tax notices if ITD has reasons to
            believe that income has been concealed by you or on any other
            grounds.
          </div>
        </div>
      </div>
      <hr />
      <div className="blog-footer">
        <div className="blog-author">
          <div className="blog-author-profile">
            <img
              src="https://imgflip.com/s/meme/Cute-Cat.jpg"
              alt="goofy aah cat"
            />
          </div>
          <div className="blog-author-name">ChinmayDesai</div>
        </div>
        <div className="next-button">
          <button>Next</button>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
