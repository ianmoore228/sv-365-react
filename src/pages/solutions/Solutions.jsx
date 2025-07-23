import "./solutions.css";
import React, { useState, useRef } from "react";
import Header from "../../components/header/solutionHeader/Header.jsx";
import EducationHeader from "../../components/header/solutionHeader/educationHeader/Header.jsx";
import MainBanner from "../../components/solutions/mainBanner/MainBanner.jsx";
import SellingPoints from "../../components/solutions/sellingPoints/SellingPoints.jsx";
import CreateApp from "../../components/solutions/createApp/CreateApp.jsx";
import CreateDish from "../../components/solutions/createDish/CreateDish.jsx";
import Workplace from "../../components/solutions/workplace/Workplace.jsx";
import { useLocation } from "react-router-dom";
// import locationData from "./location-data.js"
import Modal from "../../components/modal/Modal.jsx";
import CreateBar from "../../components/solutions/createBar/CreateBar.jsx";
import Marketing from "../../components/solutions/marketing/Marketing.jsx";
import RegisterModal from "../../components/modal/modalRegister/ModalRegister.jsx";
import Automation from "../../components/solutions/automation/Automation.jsx";
import AddOns from "../../components/solutions/addOns/AddOns.jsx";
import Education from "../../components/solutions/education/Education.jsx";
import Footer from "../../components/solutions/footer/Footer.jsx";

const Solutions = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>

      {isRegisterModalOpen && (
        <RegisterModal 
          isRegisterOpen={isRegisterModalOpen} 
          closeRegisterModal={closeRegisterModal} 
        />
      )}
      <MainBanner />
      <SellingPoints />
      {currentPath === "/solution-education" ? (
        <>
          <Education />
          <AddOns />
          <Footer />
        </>
      ) : (
        <>
          <CreateApp />
          <CreateDish />
          <Workplace />
          <CreateBar />
          <Marketing />
          <Automation />
          <AddOns />
          <Footer />
        </>
      )}
    </>
  );
};
export default Solutions;
