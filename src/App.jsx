import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Sell from "./pages/Sell";
import Buy from './pages/buy';
import Rent from './pages/rent';
import SellSuccess from './pages/SellSuccess.jsx';
import PaymentSuccess from "./pages/PaymentSuccess"; // adjust path


function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/sell" element={<Sell />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/sell-success" element={<SellSuccess />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
