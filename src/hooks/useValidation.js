import { useState } from "react";

const phoneRegex = /^\+?(\d{10})$/;
const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+([ '-][a-zA-Zа-яА-ЯёЁ]+)*$/;
const surnameRegex = /^[a-zA-Zа-яА-ЯёЁ]+([ '-][a-zA-Zа-яА-ЯёЁ]+)*$/;
const middlenameRegex = /^[a-zA-Zа-яА-ЯёЁ]+([ '-][a-zA-Zа-яА-ЯёЁ]+)*$/;

const useValidation = () => {
  const [errors, setErrors] = useState({
    phone: "",
    name: "",
    surname: "",
    middlename: "",
    password: "",
  });

  const validateField = (value, fieldType) => {
    let errorMessage = "";

    switch (fieldType) {
      case "phone":
        if (!value) {
          errorMessage = "Поле должно быть заполнено.";
        } else if (!phoneRegex.test(value)) {
          errorMessage = "Некорректный номер телефона.";
        }
        break;

      case "name":
        if (!value) {
          errorMessage = "Поле должно быть заполнено.";
        } else if (!nameRegex.test(value)) {
          errorMessage = "Имя может содержать только буквы, пробелы, дефисы и апострофы.";
        }
        break;

      case "surname":
        if (!value) {
          errorMessage = "Поле должно быть заполнено.";
        } else if (!surnameRegex.test(value)) {
          errorMessage = "Фамилия может содержать только буквы, пробелы, дефисы и апострофы.";
        }
        break;

      case "middlename":
        if (value && !middlenameRegex.test(value)) {
          errorMessage = "Отчество может содержать только буквы, пробелы, дефисы и апострофы.";
        }
        break;

      case "password":
        if (!value) {
          errorMessage = "Поле должно быть заполнено.";
        } else if (value.length < 8) {
          errorMessage = "Пароль должен быть не менее 8 символов.";
        }
        break;

      default:
        errorMessage = "";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldType]: errorMessage,
    }));

    return errorMessage === ""; 
  };

  return {
    errors,
    validateField,
  };
};

export default useValidation;
