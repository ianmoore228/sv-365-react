import React, { useState, useEffect } from "react";
import "./profileAbout.css";
import { Link } from "react-router-dom";
import img from "../../../assets/images/profile/profile-right.png";
import tariffs from "../../../data/tariffs-data.js";
// import io from "socket.io-client";


const Main = () => {

  const token = localStorage.getItem("token");

  const [timeLeft, setTimeLeft] = useState({});
  const [isTimerLoaded, setIsTimerLoaded] = useState(false);
  const [expirationDate, setExpirationDate] = useState(null);
  const [currentTariff, setCurrentTariff] = useState(null);
  const [hasPayed, setHasPayed] = useState(null);
  const [userName, setUserName] = useState('');

  const currentTariffPoints = currentTariff ? currentTariff.points : [];

  const role = localStorage.getItem('urole');

  console.log(role);

  useEffect(() => {
    async function getUserProfile() {
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
        setUserName(user.name || 'Guest'); 
        setHasPayed(user.hasPayed); 
        setExpirationDate(user.expirationDate ? new Date(user.expirationDate) : null);
        setIsTimerLoaded(true);

        const foundTariff = tariffs.find(tariff => tariff.title === user.tariff);
        setCurrentTariff(foundTariff || null);
      } catch (error) {
        console.error(error);
      }
    }

    getUserProfile(); 
  }, [token]);

  useEffect(() => {
    if (expirationDate) {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = expirationDate - now;

        if (difference <= 0) {
          clearInterval(interval);
          handleTariffExpiration();
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
          setIsTimerLoaded(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expirationDate]);

  const handleTariffExpiration = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/updateUser", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tariff: null,
          hasPayed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating user tariff status");
      }

      setCurrentTariff(null);
      setHasPayed(false);
    } catch (error) {
      console.error("Error updating tariff status:", error);
    }
  };

  return (
    <div className="profile-about" id="profile">
      <div className="profile-about__wrapper">
        <div className="profile-about__content-left">
          <h1 className="profile-about__title">Личный кабинет</h1>
          <p className="profile-about__subtitle">Здравствуйте, {userName}!</p>
          <Link className="profile-about__button" to="як://свистунофф.рф">
            Перейти на сайт свистунофф.рф
          </Link>
          <Link className="profile-about__button">
            Скачать приложение на компьютер
          </Link>
          {role === 'buyer' ? (
            <Link to={"/support"} className="profile-about__button">
            Написать в поддержку
          </Link>
           ) : (
            <Link to="/support" className="profile-about__button">
          Чат с пользователями
          </Link>
          )}
     
          <p className="profile-about__tariff-text">Мой тариф</p>
          {!currentTariff && (
            <div className="profile-about__tariff-card profile-about__tariff-card_none">
              <p className="profile-about__tariff-description">NONE</p>
            </div>
          )}
          {currentTariff && (
            <div
              style={{ opacity: hasPayed ? 1 : 0.5 }}
              className="profile-about__tariff-card"
            >
              <h3 className="profile-about__tariff-card-title">
                {currentTariff.title}
              </h3>
              <h3 className="profile-about__tariff-card-price">
                {currentTariff.price} ₽
              </h3>
              <ul className="profile-about__tariff-card-list">
                {currentTariffPoints.map((point, index) => (
                  <li className="profile-about__tariff-card-item" key={index}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="profile-about__content-right">
          <img className="profile-about__img" src={img} alt="" />
          {isTimerLoaded ? (
            <div className="profile-about__timer">
              <h3 className="profile-about__timer-title">
                До конца подписки осталось:
              </h3>
              <div className="profile-about__timer-container">
                <div className="profile-about-time__timer-items">
                  <p className="profile-about-time__timer-item">
                    {timeLeft.days ? timeLeft.days : "00"} :{" "}
                    {timeLeft.hours ? timeLeft.hours : "00"} :{" "}
                    {timeLeft.minutes ? timeLeft.minutes : "00"} :{" "}
                    {timeLeft.seconds ? timeLeft.seconds : "00"}
                  </p>
                </div>
              </div>

              <Link
                to={"/payment"}
                style={{
                  opacity: currentTariff && !hasPayed ? 1 : 0.5,
                  cursor: currentTariff && !hasPayed ? "pointer" : "default",
                  pointerEvents: currentTariff && !hasPayed ? "auto" : "none",
                }}
                className="profile-about__button-pay"
              >
                Оплатить
              </Link>

              {!currentTariff && (
                <h3 className="profile-about__no-tariff-text">Тариф не выбран!</h3>
              )}
              {currentTariff && !hasPayed && (
                <h3 className="profile-about__no-tariff-text">Тариф не оплачен!</h3>
              )}
            </div>
          ) : ( 
            <p className="profile-about__timer-loading">Загрузка таймера...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
