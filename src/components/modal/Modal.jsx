import "./modal.css";
import "./modalRegister/modalRegister.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CounterButton from "./modalRegister/CounterButton";
import PasswordModal from "./modalPassword/PasswordModal.jsx";

import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../redux/modalSlice.jsx';


const Modal = ({ openRegisterModal }) => {
  const [phone, setPhone] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0); 
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);


  // console.log(isPasswordModalOpen)


  const getUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'x-csrf-token': token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }
  
      const result = await response.json();
      
      return result;
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    let transformedPhone = phone.replace(/\D/g, ""); 
    let password = document.getElementById("password").value;
  
    if (transformedPhone.startsWith("7") && transformedPhone.length > 1) {
      transformedPhone = transformedPhone.slice(1); 
    }
    
    if (transformedPhone.startsWith("8") && transformedPhone.length > 1) {
      transformedPhone = transformedPhone.slice(1); 
    }
  
    if (transformedPhone.startsWith("375") && transformedPhone.length > 3) {
      transformedPhone = transformedPhone.slice(3); 
    }
  
    const credentials = `buyer ${transformedPhone}:${password}`;
    const encodedCredentials = btoa(unescape(encodeURIComponent(credentials)));
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `buyer_${encodedCredentials}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("urole", data.role);
  
        const userInfo = {
          name: data.user.name,
          phoneNumber: data.user.phone,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        closeModal();
  
        navigate("/profile");
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || "Неверный логин или пароль.");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      setLoginError("Ошибка сети. Попробуйте позже.");
    }
  };
  

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
    setPhone((prev) => {
      const newValue = String(parseInt(prev || "0", 10) + 1);
      return newValue;
    });
  };

  const decrementCounter = () => {
    setCounter((prev) => Math.max(prev - 1, 0)); 
    setPhone((prev) => {
      const newValue = String(parseInt(prev || "0", 10) - 1);
      return newValue;
    });
  };


  // const handleOpen = () => {
  //   dispatch(openModal());
  // };

  const handleClose = () => {
    dispatch(closeModal());
  };


  if (!isModalOpen) return null;

  return (
    <>
      <motion.div
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="modal__wrapper">
          <motion.div
            initial={{ transform: "translateY(-100%)" }}
            animate={{ transform: "translateY(0%)" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="modal__content"
          >
            <button
              onClick={() =>{  handleClose () }}
              className="modal__button-close"
            >
              ×
            </button>
            <h2 className="modal__title">Вход в личный кабинет</h2>
            <form id="form" className="modal__form" onSubmit={handleLogin}>
              <div className="modal__input-container">
                <div className="modal__counter-container">
                  <input
                    maxLength={20}
                    className="modal__input modal__input_phone"
                    placeholder="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <CounterButton
                    increment={incrementCounter}
                    decrement={decrementCounter}
                  />
                </div>
                <input
                id="password"
                  maxLength={100}
                  className="modal__input modal__input_password"
                  placeholder="Пароль"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginError && <p className="modal__error-login">{loginError}</p>}
              <button
              type="button"
                onClick={() => {
                  // closeModal();
                  openPasswordModal();
                }}
                className="modal__forgot-password"
              >
                Забыли пароль?
              </button>
              <div className="modal__buttons-wrapper">
                <button
                  type="submit"
                  className="modal__button modal__button_login"
                >
                  Далее
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    openRegisterModal();
                  }}
                  className="modal__button modal__button_register"
                >
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
      { isPasswordModalOpen && (
        <PasswordModal isPasswordModalOpen={isPasswordModalOpen} closePasswordModal={closePasswordModal} />
      )
      }
    </>
  );
}
export default Modal;