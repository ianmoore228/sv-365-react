import "./mainBanner.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import tariffs from "../../../data/tariffs-data.js";
import React, { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import Modal from "../../modal/Modal"; 
import tariffs from "../../../data/tariffs-data.js";
// import {}

const MainBanner = ({openRegisterModal}) => {


  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const bannerObj = tariffs.find((item) => item.path === currentPath);

  const bannerPrice = bannerObj ? bannerObj.price : 2000;
  const bannerOldPrice = bannerObj ? bannerObj.oldPrice : 3000;

  const [currentTariff, setCurrentTariff] = useState('');

  const count = useMotionValue(bannerOldPrice);
  const rounded = useTransform(count, (value) =>
    Math.floor(value).toLocaleString("ru-RU").replace(/,/g, "")
  );

  // console.log(`start ${isStartClicked}`);
  // console.log(`modal ${isModalOpen}`);

  useEffect(() => {
    animate(count, bannerPrice, {
      duration: 1.7,
    });
  }, [bannerPrice, count]);

  const handleStartClick = async (e) => {
    e.preventDefault();
    
    setIsStartClicked(true);
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      
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
        setCurrentTariff(user.tariff || null);

        if (user.tariff === bannerObj.title) {
            alert("У вас уже выбран этот тариф.");
            return;
        }

        console.log(`Тариф юзера: ${user.tariff}`)

        if (user.tariff !== '') {  
            const changeTariff = confirm("Вы действительно хотите поменять тариф?");
            if (!changeTariff) {
                setIsStartClicked(false); 
                return;
            }
        }

        const updatedData = {
          tariff: bannerObj.title,
          hasPayed: false,
          expirationDate: null,  
          purchaseDate: null     
      };

        try {
            const updateResponse = await fetch("http://localhost:3000/updateUser", { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({
                    ...updatedData,}),
            });

            if (updateResponse.ok) {
                console.log("Тариф и статус оплаты успешно сохранены");
                navigate("/payment"); 
            } else {
                const errorData = await updateResponse.json();
                console.error("Ошибка обновления данных пользователя:", errorData.error);
            }
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }

    } catch (error) {
        console.error(error);
    } finally {
        setIsStartClicked(false); 
    }
};



  return (
    <section className="main-banner-tariffs">
      <div className="main-banner-tariffs__wrapper">
        <div className="main-banner-tariffs__content">
          <h1 className="main-banner-tariffs__title">
            Вы выбрали тариф {bannerObj.title}
          </h1>
          <div className="main-banner-tariffs__price">
            <p className="main-banner-tariffs__price-text">от</p>
            <motion.span key={bannerPrice}>{rounded}</motion.span>
            <p className="main-banner-tariffs__price-text"> рублей в месяц</p>
          </div>
          <Link onClick={handleStartClick} className="button main-banner-tariffs__button">
            Начать
          </Link>
        </div>
      </div>

      {/* {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          openRegisterModal={openRegisterModal} 
        />
      )} */}
    </section>
  );
};

export default MainBanner;
