import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import workplaceSlider1Data from "../workplace-data/workplace-slider1-data";
import workplaceSlider2Data from "../workplace-data/workplace-slider2-data";
import workplaceDescTexts from "../workplace-data/workplace-texts-data";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "../workplace.css";

const splitDescription = (point) => {
  const parts = point.split(":");
  if (parts.length === 2) {
    return (
      <>
        <span>{parts[0]}:</span>
        {parts[1]}
      </>
    );
  }
  return point;
};

const WorkplaceTop = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const workplaceSlider1DataObj = workplaceSlider1Data.find(
    (item) => item.path === currentPath
  );

  const workplaceSlider2DataObj = workplaceSlider2Data.find(
    (item) => item.path === currentPath
  );

  const workplaceSlider1Titles = workplaceSlider1DataObj
    ? workplaceSlider1DataObj.texts
    : [];

  const workplaceSlider2Titles = workplaceSlider2DataObj
    ? workplaceSlider2DataObj.texts
    : [];

  const workplaceSlider1Images = workplaceSlider1DataObj
    ? workplaceSlider1DataObj.images
    : [];

  const workplaceSlider2Images = workplaceSlider2DataObj
    ? workplaceSlider2DataObj.images
    : [];

  const [pageTop, setPageTop] = useState(0);
  const [pageBottom, setPageBottom] = useState(0);
  const intervalRefTop = useRef(null);
  const intervalRefBottom = useRef(null);

  const imageIndexTop = wrap(0, workplaceSlider1Images.length, pageTop);
  const imageIndexBottom = wrap(0, workplaceSlider2Images.length, pageBottom);

  const startAutoChangeTop = () => {
    if (intervalRefTop.current) return;
    intervalRefTop.current = setInterval(() => {
      setPageTop((prevPage) => (prevPage + 1) % workplaceSlider1Images.length);
    }, 3000);
  };

  const stopAutoChangeTop = () => {
    if (intervalRefTop.current) {
      clearInterval(intervalRefTop.current);
      intervalRefTop.current = null;
    }
  };

  const startAutoChangeBottom = () => {
    if (intervalRefBottom.current) return;
    intervalRefBottom.current = setInterval(() => {
      setPageBottom(
        (prevPage) => (prevPage + 1) % workplaceSlider2Images.length
      );
    }, 3000);
  };

  const stopAutoChangeBottom = () => {
    if (intervalRefBottom.current) {
      clearInterval(intervalRefBottom.current);
      intervalRefBottom.current = null;
    }
  };

  useEffect(() => {
    startAutoChangeTop();
    return () => stopAutoChangeTop();
  }, []);

  useEffect(() => {
    startAutoChangeBottom();
    return () => stopAutoChangeBottom();
  }, []);

  const imagePaginateTop = (newIndexTop) => {
    setPageTop(newIndexTop);
    stopAutoChangeTop();
    startAutoChangeTop();
  };

  const imagePaginateBottom = (newIndexBottom) => {
    setPageBottom(newIndexBottom);
    stopAutoChangeBottom();
    startAutoChangeBottom();
  };

  return (
    <div className="workplace__content-top">
      <div className="workplace__container workplace__container_first">
        <div className="workplace__container-text workplace__container-text_first">
          <h2 className="workplace__title">
            {workplaceDescTexts.find((item) => item.id === 1).title}
          </h2>
          <p className="workplace__text">
            {workplaceDescTexts.find((item) => item.id === 1).textTop}
          </p>
          <ul className="workplace__list">
            {workplaceDescTexts
              .find((item) => item.id === 1)
              ?.points?.map((point, index) => (
                <li key={index} className="workplace__list-item">
                {splitDescription(point)}
                </li>
              ))}
          </ul>
          <p className="workplace__text">
            {workplaceDescTexts.find((item) => item.id === 1).textBottom}
          </p>
        </div>

        <div className="workplace__container-image workplace__container-image_second">
          <div className="workplace__image-wrapper workplace__image-wrapper_first">
            <AnimatePresence initial={false}>
              <motion.img
                className="workplace__image"
                key={imageIndexTop}
                src={workplaceSlider1Images[imageIndexTop]}
                alt={`Image ${imageIndexTop + 1}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                }}
              />
            </AnimatePresence>
          </div>
          <div className="workplace__sliders workplace__sliders_first">
            {workplaceSlider1Images.map((image, index) => (
              <div
                className="workplace__slider-container"
                onClick={() => imagePaginateTop(index)}
                key={index}
              >
                <div
                  className={`workplace__slider ${
                    index === imageIndexTop ? "active-slider" : ""
                  }`}
                ></div>
                <div
                  className={`workplace__slider-text-container ${
                    index === imageIndexTop ? "active-slider-text" : ""
                  }`}
                >
                  <p className="workplace__slider-text">
                    {workplaceSlider1Titles[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h2 className="workplace__title workplace__title_second">
      {workplaceDescTexts.find((item) => item.id === 2).title}
      </h2>
      <div className="workplace__container workplace__container_second">
        <div className="workplace__container-text workplace__container-text_first">
          <p className="workplace__text">
          {workplaceDescTexts.find((item) => item.id === 1).textTop}
          </p>
          <ul className="workplace__list">
          {workplaceDescTexts
              .find((item) => item.id === 2)
              ?.points?.map((point, index) => (
                <li key={index} className="workplace__list-item">
                {splitDescription(point)}
                </li>
              ))}
          </ul>
        </div>
        <div className="workplace__container-image workplace__container-image_second">
          <div className="workplace__image-wrapper workplace__image-wrapper_first">
            <AnimatePresence initial={false}>
              <motion.img
                className="workplace__image"
                key={imageIndexBottom}
                src={workplaceSlider2Images[imageIndexBottom]}
                alt={`Image ${imageIndexBottom + 1}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                }}
              />
            </AnimatePresence>
          </div>
          <div className="workplace__sliders workplace__sliders_first">
            {workplaceSlider2Images.map((image, index) => (
              <div
                className="workplace__slider-container"
                onClick={() => imagePaginateBottom(index)}
                key={index}
              >
                <div
                  className={`workplace__slider ${
                    index === imageIndexBottom ? "active-slider" : ""
                  }`}
                ></div>
                <div
                  className={`workplace__slider-text-container ${
                    index === imageIndexBottom ? "active-slider-text" : ""
                  }`}
                >
                  <p className="workplace__slider-text">
                    {workplaceSlider2Titles[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceTop;
