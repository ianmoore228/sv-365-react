import { motion, useTime, useTransform } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import "./createApp.css";
import imagesData from "./createApp-data.js";
import { wrap } from "popmotion";

const CreateApp = () => {
  const images = imagesData ? imagesData.images : [];

  const [page, setPage] = useState(0);
  const imageIndex = wrap(0, images.length, page);

  const intervalRef = useRef(null);

  // console.log(imageIndex);
  // console.log(images[imageIndex]);

  const imagePaginate = (newIndex) => {
    setPage(newIndex);
    stopAutoChange();
    startAutoChange();
  };

  useEffect(() => {
    startAutoChange();
    return () => stopAutoChange();
  }, []);

  const startAutoChange = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setPage((prevPage) => (prevPage + 1) % images.length);
    }, 3000);
  };

  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section id="createApp" className="create-app">
      <div className="create-app__wrapper">
        <div className="create-app__left">
          <div className="create-app__text-container">
            <h1 className="create-app__title">
              Твое приложение и интернет-магазин
            </h1>
            <p className="create-app__text">
              Мгновенно создай приложение и интернет-магазин для своего бизнеса
              и размести его в популярных маркетах.
            </p>
          </div>
        </div>
        <div className="create-app__right">
          <div className="create-app__img-container">
            <motion.img
              animate={{
                x: [0, 0, 0, 0, 0, 0, 100],
                opacity: [0, 1, 1, 1, 1, 1, 1, 0],
              }}
              transition={{
                duration: 2.9,
                ease: "easeIn",
              }}
              className="create-app__img"
              key={images[imageIndex]}
              src={images[imageIndex]}
              alt="Selected"
            />
          </div>
          <div className="create-app__sliders">
            {images.map((image, index) => (
              <div
                onClick={() => imagePaginate(index)}
                className={`create-app__slider ${
                  imageIndex === index ? "active-slider" : ""
                }`}
                key={index}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateApp;
