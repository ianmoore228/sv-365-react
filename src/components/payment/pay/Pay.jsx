import "./pay.css";
import img from "../../../assets/images/payment/payment.png";
import tariffs from "../../../data/tariffs-data.js";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Pay = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [currentTariff, setCurrentTariff] = useState(null); 

  useEffect(() => {
    async function getUserProfile() {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/me', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching user profile');
        }

        const user = await response.json();
        setUserId(user._id); // Сохраняем ID пользователя

        const foundTariff = tariffs.find(tariff => tariff.title === user.tariff);
        setCurrentTariff(foundTariff || null);

        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }

    getUserProfile();
  }, []);

  const handlePayClick = async (e) => {
    e.preventDefault();
  
    const purchaseDate = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(purchaseDate.getDate() + 30);
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:3000/updateUserPayment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hasPayed: true,
          purchaseDate: purchaseDate.toISOString(),
          expirationDate: expirationDate.toISOString(),
        }),
      });
  
      if (response.ok) {
        console.log("Тариф и статус оплаты успешно сохранены");
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.error("Ошибка обновления данных пользователя:", errorData.error);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };
  


  return (
    <div className="pay">
      <div className="pay__wrapper">
        <div className="pay__container pay__container_top">
          <div className="pay__content pay__content_left">
            <h1 className="pay__title pay__title_payment">Оплата</h1>
            <h1 className="pay__title pay__title_tariff">
            Тариф "{currentTariff ? currentTariff.title : ''}"
            </h1>
            <form className="pay__form">
              <input
                maxLength={100}
                type="text"
                placeholder="Номер"
                className="pay__input"
              />
              <input
                maxLength={100}
                type="text"
                placeholder="Email"
                className="pay__input"
              />
              <input
                maxLength={100}
                type="text"
                placeholder="Фамилия"
                className="pay__input"
              />
              <input
                maxLength={100}
                type="text"
                placeholder="Имя"
                className="pay__input"
              />
              <input
                maxLength={100}
                type="text"
                placeholder="Организация"
                className="pay__input"
              />
              <input
                maxLength={100}
                type="text"
                placeholder="ИП/ООО"
                className="pay__input"
              />
              <input
                maxLength={100}
                type="text"
                placeholder="Номер"
                className="pay__input"
              />
              <input
                maxLength={100}
                type="text"
                placeholder="Номер"
                className="pay__input"
              />
            </form>
          </div>
          <div className="pay__content pay__content_right">
            <img src={img} alt="payment" />
          </div>
        </div>
        <div className="pay__container pay__container_bottom">
          <h2 className="pay__subtitle pay__subtitle_first">
            Выберите удобный способ оплаты
          </h2>
          <div className="pay__card-container">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px #0d3add" }}
              whileTap={{ scale: 0.9 }}
              initial={{
                scale: 1,
                boxShadow: "0 0 15px #0d3add",
              }}
              transition={{ duration: 0.4, type: "spring" }}
              className="pay__card pay__card-left"
            >
              <h3 className="pay__card-title pay__card-title_left">По карте</h3>
              <p className="pay__card-text pay__card-text_left">
                Активируется сразу
              </p>
            </motion.div>
            <div className="pay__card pay__card-right">
              <h3 className="pay__card-title pay__card-title_right">
                По безналичному расчету
              </h3>
              <p className="pay__card-text pay__card-text_right">
                Активируется в течение 3-х дней
              </p>
            </div>
          </div>
          <h2 className="pay__subtitle pay__subtitle_second">
            Введите данные карты
          </h2>
          <div className="pay__price-wrapper">
            <p className="pay__text-price">К оплате</p>
            <div className="pay__line"></div>
            <p className="pay__price">{currentTariff ? currentTariff.price : ""}₽</p>
          </div>
          <motion.button
            onClick={handlePayClick}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px #0d3add" }}
            whileTap={{ scale: 0.9 }}
            initial={{
              scale: 1,
              boxShadow: "0 0 15px #0d3add00",
            }}
            transition={{ duration: 0.4, type: "spring" }}
            className="pay__button"
          >
            Оплатить
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Pay;
