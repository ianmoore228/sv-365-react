import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InputField from "./InputField";
import CounterButton from "./CounterButton";
import ErrorMessage from "./ErrorMessage";
import useValidation from "../../../hooks/useValidation";
import "./modalRegister.css";

const ModalRegister = ({ isRegisterOpen, closeRegisterModal }) => {
  const [ counter, setCounter ] = useState();
  const { errors, validateField } = useValidation();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+79");
 

  useEffect(() => {
    if (!isRegisterOpen) {
      setPhone("");
      setPassword("");
      setName("");
      setSurname("");
      setMiddlename("");
      setCounter(0);
    }
  }, [isRegisterOpen]);

  const generatePassword = () => {
    let charset =
      "!@#$%^&*()0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newPassword = "";

    let passwordLength = 12;

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    validateField(newPassword, "password");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateField(e.target.value, "name");
  };

  const handlePhoneChange = (e) => {
    // const newValue = e.target.value.replace(/\D/g, ""); 
    setCounter(e.target.value ? e.target.value : 0);
    setPhone(e.target.value);
    validateField(e.target.value, "phone");
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
    validateField(e.target.value, "surname");
  };

  const handleMiddlenameChange = (e) => {
    setMiddlename(e.target.value);
    validateField(e.target.value, "middlename");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateField(e.target.value, "password");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors || !name || !surname || !phone || !password) {
      console.log("Исправьте ошибки в форме");
      return;
    } else {
      closeRegisterModal();
    }

    let transformedPhone = phone.replace(/\D/g, ""); 


    if (transformedPhone.startsWith("7") && transformedPhone.length > 1) {
      transformedPhone = transformedPhone.slice(1); 
    }
    
    if (transformedPhone.startsWith("8") && transformedPhone.length > 1) {
      transformedPhone = transformedPhone.slice(1); 
    }
  
    if (transformedPhone.startsWith("375") && transformedPhone.length > 3) {
      transformedPhone = transformedPhone.slice(3); 
    }
  
    const registerData = {
      name: name,
      surname: surname,
      lastname: middlename,
      phone: phone,
      password: password,
      role: "buyer",
    };

 
  
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
  
      // Check if response is OK and has a body
      if (!response.ok) {
        const errorData = await response.text(); // Get the response body as text
        console.log("Ошибка при регистрации:", errorData);
        alert(`Ошибка: ${errorData}`);
        return;
      }
  
      const data = await response.json(); // Parse the response as JSON
  
      if (data) {
        console.log("Новый пользователь успешно добавлен:", data);
        alert("Регистрация прошла успешно!");
      } else {
        console.error("Ответ пустой или невалидный:", data);
        alert("Ошибка: Получен пустой ответ от сервера.");
      }
  
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert("Ошибка при регистрации. Попробуйте еще раз.");
    }
  };
  

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
    setPhone((prev) => {
      const newValue = String(parseInt(prev || "0", 10) + 1);
      validateField(newValue, "phone");
      return newValue;
    });
  };

  const decrementCounter = () => {
    setCounter((prev) => ( prev - 1 ));
    setPhone((prev) => {
      const newValue = String(parseInt(prev || "0", 10) - 1);
      validateField(newValue, "phone");
      return newValue;
    });
  };

  return (
    <motion.div
      className="modal modal_register"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="modal__wrapper modal__wrapper_register">
        <motion.div
          initial={{ transform: "translateY(-100%)" }}
          animate={{ transform: "translateY(0%)" }}
          transition={{ duration: 0.5, type: "spring" }}
          className="modal__content modal__content_register"
        >
          <button
            onClick={() => closeRegisterModal()}
            className="modal__button-close modal__button-close_register"
          >
            ×
          </button>
          <h2 className="modal__title modal__title_register">Регистрация</h2>
          <form
            onSubmit={handleSubmit}
            id="form"
            className="modal__form modal__form_register"
          >
            <InputField
             maxLength={100}
              inputClass="modal__input_name_register"
              value={name}
              onChange={handleNameChange}
              placeholder="Имя *"
            />
            <ErrorMessage
              errorClass="modal__error_name_register"
              message={errors.name}
            />

            <InputField
             maxLength={100}
              inputClass="modal__input_surname_register"
              value={surname}
              onChange={handleSurnameChange}
              placeholder="Фамилия *"
            />
            <ErrorMessage
              errorClass="modal__error_surname_register"
              message={errors.surname}
            />

            <InputField
             maxLength={100}
              inputClass="modal__input_middlename_register"
              value={middlename}
              onChange={handleMiddlenameChange}
              placeholder="Отчество"
            />
            <ErrorMessage
              errorClass="modal__error_middlename_register"
              message={errors.middlename}
            />

            <div className="modal__counter-container modal__counter-container_register">
              <InputField
                maxLength={17}
                inputClass="modal__input_phone_register"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Номер телефона *"
              />
              <ErrorMessage
                errorClass="modal__error_phone_register"
                message={errors.phone}
              />
              <CounterButton
                increment={incrementCounter}
                decrement={decrementCounter}
              />
            </div>

            <button
              onClick={(event) => {
                event.preventDefault();
                generatePassword();
              }}
              className="modal__generate-password modal__generate-password_register"
            >
              Сгенерировать пароль
            </button>

            <InputField
             maxLength={100}
              inputClass="modal__input_password_register"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Пароль *"
            />
            <ErrorMessage
              errorClass="modal__error_password_register"
              message={errors.password}
            />
            <div className="modal__buttons-wrapper modal__buttons-wrapper_register">
              <button
                type="submit"
                className="modal__button modal__button_register"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModalRegister;