import "./mainBanner.css";
import bannerData from "./data/banner-data";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import arrow from "../../../assets/images/arrow-right.png";
import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";

const MainBanner = () => {
  const bannerTitle = useRef();

  const location = useLocation();
  const currentPath = location.pathname;


  const bannerObj = bannerData.find((item) => item.path === currentPath);

  const backgroundImage = bannerObj ? bannerObj.image : "";
  const bannerText = bannerObj ? bannerObj.text : "";
  const bannerPrice = bannerObj ? bannerObj.price : 2000;


  const count = useMotionValue(2000); 
  const rounded = useTransform(count, (value) =>
    Math.floor(value).toLocaleString("ru-RU").replace(/,/g, "")
  );

  useEffect(() => {

    animate(count, bannerPrice, {
      duration: 1.7,
    });
  }, [bannerPrice, count]);

  return (
    <div className="solution-main-banner">
      <motion.div
        ref={bannerTitle}
        className="solution-main-banner__wrapper"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="solution-main-banner__content">
          {bannerText && (
            <h1 className="solution-main-banner__title">
              Автоматизация {bannerText}
            </h1>
          )}
          <div className="solution-main-banner__price">
            <p className="solution-main-banner__price-text">от</p>
            <motion.span key={bannerPrice}>{rounded}</motion.span>
            <p className="solution-main-banner__price-text">рублей в месяц</p>
          </div>
          <Link className="solution-main-banner__button-start">
            Начать
            <div>
              <img
                src={arrow}
                className="solution-main-banner__button-arrow"
                alt="arrow"
              />
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MainBanner;
