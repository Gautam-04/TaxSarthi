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
import Docs from "./pages/Docs-list/Docs";
import FormFilling from "./pages/Main Form/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/taxes/about-taxes", element: <AboutTaxes /> },
  { path: "/taxes/tax-basics", element: <Home /> },
  { path: "/taxes/other-taxes", element: <Home /> },
  { path: "/savings/smart-savings", element: <Home /> },
  { path: "/savings/tax-saving-investment", element: <Home /> },
  { path: "/savings/deductions-benefits", element: <Home /> },
  { path: "/filing/filing-your-taxes", element: <Home /> },
  { path: "/filing/organizing-document", element: <Home /> },
  { path: "/help/reponding-to-notice", element: <Home /> },
  { path: "/help/disputes-resolution", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/docs-list", element: <Docs /> },
  { path: "/form-filling", element: <FormFilling /> },
  // Error Route
  { path: "/*", element: <ErrorPage /> },
];

function App() {
  return (
    <>
      <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
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
