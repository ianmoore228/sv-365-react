import React, { useState, useRef } from "react";
import MainBanner from "../../components/tariffs/mainBanner/MainBanner.jsx";
import Advantages from "../../components/tariffs/advantages/Advantages.jsx";
import QuestionForm from "../../components/tariffs/questionForm/QuestionForm.jsx";
import Footer from "../../components/profile/footer/Footer.jsx";
import Header from "../../components/header/tariffsHeader/Header.jsx";
import Modal from "../../components/modal/Modal.jsx";
import RegisterModal from "../../components/modal/modalRegister/ModalRegister.jsx";
import "./tariffs.css";

const Tariffs = () => {
const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };
  
  return (
    <>
      <Header  />
      {/* {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          openRegisterModal={openRegisterModal}
        />
      )} */}
      {isRegisterModalOpen && (
        <RegisterModal
          isRegisterOpen={isRegisterModalOpen}
          closeRegisterModal={closeRegisterModal}
        />
      )}
      <div className="tariffs-main">
        <MainBanner openRegisterModal={openRegisterModal} />
        <Advantages />
        <QuestionForm />
        <Footer />
      </div>
    </>
  );
};

export default Tariffs;
