import "./App.css";
import About from "./pages/about/About.jsx";
import Solutions from "./pages/solutions/Solutions.jsx";
import Tariffs from "./pages/tariffs/Tariffs.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import PrivateRouteProfile from "./components/privateRoutes/PrivateRouteProfile.jsx";
import PrivateRoutePayment from "./components/privateRoutes/PrivateRoutePayment.jsx";
import PrivateRouteSupport from "./components/privateRoutes/PrivateRouteSupport.jsx";
import Payment from "./pages/payment/Payment.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Support from "./pages/support/Support.jsx";
import ScrollToTop from "./components/ScrollToTop";
import Modal from "./components/modal/Modal.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/solution-cafe" element={<Solutions />} />
        <Route path="/solution-restaurant" element={<Solutions />} />
        <Route path="/solution-delivery" element={<Solutions />} />
        <Route path="/solution-shop" element={<Solutions />} />
        <Route path="/solution-coffeeshop" element={<Solutions />} />
        <Route path="/solution-flowershop" element={<Solutions />} />
        <Route path="/solution-pizzeria" element={<Solutions />} />
        <Route path="/solution-education" element={<Solutions />} />
        <Route
          path="/support"
          element={<PrivateRouteSupport element={<Support />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRouteProfile element={<Profile />} />}
        />
        <Route
          path="/payment"
          element={<PrivateRoutePayment element={<Payment />} />}
        />
        <Route path="/tariff-start" element={<Tariffs />} />
        <Route path="/tariff-basic" element={<Tariffs />} />
        <Route path="/tariff-regional" element={<Tariffs />} />
        <Route path="/tariff-regional-pro" element={<Tariffs />} />
        <Route path="/tariff-federal" element={<Tariffs />} />
        <Route path="/tariff-federal-pro" element={<Tariffs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
