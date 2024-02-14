import ReactGA from "react-ga4";
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

const TRACKING_ID = "UA-267327544-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID, { debug: true });

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

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      {!isBlankDocRoute && !loading && <Header />}
      <Routes>
        <Route path="/old" element={<OldMulti />} />
        <Route
          path="/"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />
        <Route
          path="/taxes/about-taxes"
          element={loading ? <BoxLoader loading={loading} /> : <AboutTaxes />}
        />
        <Route
          path="/taxes/what-are-taxes"
          element={loading ? <BoxLoader loading={loading} /> : <WhatAreTaxes />}
        />
        <Route
          path="/taxes/types-of-taxes"
          element={loading ? <BoxLoader loading={loading} /> : <TypesOfTaxes />}
        />
        <Route
          path="/taxes/itr-filing"
          element={loading ? <BoxLoader loading={loading} /> : <ItrFiling />}
        />
        <Route
          path="/taxes/tax-planning"
          element={loading ? <BoxLoader loading={loading} /> : <TaxPlanning />}
        />
        <Route
          path="/taxes/save-taxes"
          element={loading ? <BoxLoader loading={loading} /> : <SaveTaxes />}
        />
        <Route
          path="/taxes/tax-notice"
          element={loading ? <BoxLoader loading={loading} /> : <TaxNotice />}
        />
        <Route
          path="/taxes/faqs"
          element={loading ? <BoxLoader loading={loading} /> : <FAQs />}
        />
        <Route
          path="/taxes/tax-basics"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />
        <Route
          path="/taxes/other-taxes"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />

        {/* Savings Routes */}
        <Route
          path="/savings/smart-savings"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />
        <Route
          path="/savings/tax-saving-investment"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />
        <Route
          path="/savings/deductions-benefits"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />

        {/* Filing Routes */}
        <Route
          path="/filing/filing-your-taxes"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />
        <Route
          path="/filing/organizing-document"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />

        {/* Help Routes */}
        <Route
          path="/help/reponding-to-notice"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />
        <Route
          path="/help/disputes-resolution"
          element={loading ? <BoxLoader loading={loading} /> : <Home />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={loading ? <BoxLoader loading={loading} /> : <Login />}
        />

        <Route
          path="/docs-list"
          element={loading ? <BoxLoader loading={loading} /> : <Docs />}
        />
        <Route
          path="/form-filling"
          element={loading ? <BoxLoader loading={loading} /> : <FormFilling />}
        />

        {/* Error Route */}
        <Route
          path="/*"
          element={loading ? <BoxLoader loading={loading} /> : <ErrorPage />}
        />

        {/* Pdf docs Path */}
        <Route
          path="/doc"
          element={loading ? <BoxLoader loading={loading} /> : <OutPutDoc />}
        />
      </Routes>
      {!isBlankDocRoute && !loading && <Footer />}
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
