import "./mainBanner.css";
import { Link as ScrollLink } from "react-scroll";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { use } from "react";

const MainBanner =() => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const response = fetch('http://localhost:3000/api/wall');
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      const data = response.json();
    
      console.log(data);
    } catch (error) {
      console.error('Ошибка запроса:', error.message);
    
    }
  }, []);


  return (
    <section className="main-banner">
      <div className="main-banner__wrapper">
        <div className="main-banner__content">
          <h1 className="main-banner__title">
            Нейросистема для твоих лёгких продаж
          </h1>
          <p className="main-banner__text">программа для ресторанов и кафе</p>
          <div className="main-banner__price">
            <p className="main-banner__price-text">от</p>
            <span>990</span>
            <p className="main-banner__price-text"> рублей в месяц</p>
          </div>
          <ScrollLink
          animate={{ x: 2 }}
            to="tariffs"
            smooth={true}
            className="button main-banner__button"
          >
            Начать
          </ScrollLink>
         
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
