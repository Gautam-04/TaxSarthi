import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

function App() {
  

  return (
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Taxes Routes */}
        <Route path="/taxes/" element={<Home />} />
        <Route path="/taxes/" element={<Home />} />
        <Route path="/taxes/" element={<Home />} />
        {/* Savings Routes */}
        <Route path="/savings/" element={<Home />} />
        <Route path="/savings/" element={<Home />} />
        <Route path="/savings" element={<Home />} />
        {/* Filing Routes */}
        <Route path="/filing/" element={<Home />} />
        <Route path="/filing/" element={<Home />} />
        {/* Help Routes */}
        <Route path="/help/" element={<Home />} />
        <Route path="/help/" element={<Home />} />
        {/* Error Route */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
