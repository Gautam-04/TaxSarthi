import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ErrorPage from "./pages/Error/ErrorPage";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AboutTaxes from "./pages/Taxes/About Taxes/AboutTaxes";

function App() {
  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Taxes Routes */}
        <Route path="/taxes/about-taxes" element={<AboutTaxes />} />
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
        {/* Error Route */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
