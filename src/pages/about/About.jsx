import React, { useState, useRef } from "react";
import MainBanner from "../../components/about/mainBanner/MainBanner.jsx";
import Solution from "../../components/about/solution/Solution.jsx";
import Description from "../../components/about/description/Description.jsx";
import Tariffs from "../../components/about/tariffs/Tariffs.jsx";
import CreateApp from "../../components/about/createApp/CreateApp.jsx";
import Training from "../../components/about/training/Training.jsx";
import Report from "../../components/about/report/Report.jsx";
import Administration from "../../components/about/administration/Administration.jsx";
import Modal from "../../components/modal/Modal.jsx";
import RegisterModal from "../../components/modal/modalRegister/ModalRegister.jsx";
import Header from "../../components/header/Header.jsx"; 
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../redux/modalSlice.jsx';

import "./about.css";

const About = () => {
  const dispatch = useDispatch();

  // Достаем состояния из Redux хранилища
  const isModalOpen = useSelector((state) => state.modal.isModalOpen); // Для основного модального окна


  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };


  // console.log(`register ${isRegisterModalOpen}`)

  return (
    <>
      <Header openModal={() => dispatch(openModal())} />
      {isModalOpen && (
        <Modal 
       isModalOpen={isModalOpen}
       closeModal={() => dispatch(closeModal())}
          openRegisterModal={openRegisterModal} 
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal 
          isRegisterOpen={isRegisterModalOpen} 
          closeRegisterModal={closeRegisterModal} 
        />
      )}
      <div className="about">
        <MainBanner  />
        <Solution />
        <Description />
        <Tariffs />
        <CreateApp />
        <Training />
        <Report />
        <Administration />
      </div>
    </>
  );
};

export default About;
