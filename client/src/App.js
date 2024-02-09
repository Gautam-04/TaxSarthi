import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ErrorPage from "./pages/Error/ErrorPage";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutTaxes from "./pages/Taxes/About Taxes/AboutTaxes";
import Docs from "./pages/Docs-list/Docs";
import FormFilling from "./pages/Main Form/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhatAreTaxes from "./pages/Taxes/About Taxes/WhatAreTaxes/what-are-taxes";
import TypesOfTaxes from "./pages/Taxes/About Taxes/TypesOfTaxes/types-of-taxes";
import ItrFiling from "./pages/Taxes/About Taxes/ItrFiling/itr-filing";
import TaxPlanning from "./pages/Taxes/About Taxes/TaxPlanning/tax-planning";
import SaveTaxes from "./pages/Taxes/About Taxes/SaveTaxes/save-taxes";
import TaxNotice from "./pages/Taxes/About Taxes/IncomeTaxNotice/tax-notice";
import FAQs from "./pages/Taxes/About Taxes/FAQs/faqs";
import { useState, useEffect } from "react";
import BoxLoader from "./components/Loader/BoxLoader";
import OldMulti from "./pages/Main Form/Old Tax/OldMulti";
import OutPutDoc from "./pages/Pdf Docs/OutPutDoc";
import Section142_1 from "./pages/Taxes/About Taxes/FAQs/section-142(1)";
import Section139_9 from "./pages/Taxes/About Taxes/FAQs/section-139(9)";

function App() {
  const location = useLocation();
  const isBlankDocRoute = location.pathname === "/doc";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true when the route changes
    setLoading(true);

    // Simulate loading delay (you can replace this with actual data fetching logic)
    const timer = setTimeout(() => {
      // Set loading back to false after the delay
      setLoading(false);
    }, 900);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [location.pathname]); // Empty dependency array to run the effect only once on mount

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Taxes Routes */}
        <Route path="/taxes/about-taxes" element={<AboutTaxes />} />
        {/* What are Taxes?*/}
        <Route path="/taxes/what-are-taxes" element={<WhatAreTaxes />} />
        <Route path="/taxes/types-of-taxes" element={<TypesOfTaxes />} />
        <Route path="/taxes/itr-filing" element={<ItrFiling />} />
        <Route path="/taxes/tax-planning" element={<TaxPlanning />} />
        <Route path="/taxes/save-taxes" element={<SaveTaxes />} />
        <Route path="/taxes/tax-notice" element={<TaxNotice />} />
        <Route path="/taxes/faqs" element={<FAQs />} />
        <Route path="/taxes/tax-basics" element={<Home />} />
        <Route path="/taxes/other-taxes" element={<Home />} />
        {/* Savings Routes */}
        <Route path="/savings/smart-savings" element={<Home />} />
        <Route path="/savings/tax-saving-investment" element={<Home />} />
        <Route path="/savings/deductions-benefits" element={<Home />} />
        {/* Filing Routes */}
        <Route path="/filing/filing-your-taxes" element={<Home />} />
        <Route path="/filing/organizing-document" element={<Home />} />
        {/* Help Routes */}
        <Route path="/help/reponding-to-notice" element={<Home />} />
        <Route path="/help/disputes-resolution" element={<Home />} />
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/docs-list" element={<Docs />} />
        <Route path="/form-filling" element={<FormFilling />} />
        {/* Error Route */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
