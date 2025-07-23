import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import workplaceSlider3Data from "../workplace-data/workplace-slider3-data";
import workplaceSlider4Data from "../workplace-data/workplace-slider4-data";
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

const WorkplaceBottom = () => {


  const location = useLocation();
  const currentPath = location.pathname;


  const workplaceSlider4DataObj = workplaceSlider4Data.find(
    (item) => item.path === currentPath
  );

  const workplaceSlider3Titles = workplaceSlider3Data[0].texts;

  const workplaceSlider4Titles = workplaceSlider4DataObj
    ? workplaceSlider4DataObj.texts
    : [];


  const workplaceSlider3Images = workplaceSlider3Data[0].images;

  const workplaceSlider4Images = workplaceSlider4DataObj
    ? workplaceSlider4DataObj.images
    : [];

  const [pageTop, setPageTop] = useState(0);
  const [pageBottom, setPageBottom] = useState(0);
  const intervalRefTop = useRef(null);
  const intervalRefBottom = useRef(null);

  const imageIndexTop = wrap(0, workplaceSlider3Images.length, pageTop);
  const imageIndexBottom = wrap(0, workplaceSlider4Images.length, pageBottom);

  const startAutoChangeTop = () => {
    if (intervalRefTop.current) return;
    intervalRefTop.current = setInterval(() => {
      setPageTop((prevPage) => (prevPage + 1) % workplaceSlider3Images.length);
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
        (prevPage) => (prevPage + 1) % workplaceSlider4Images.length
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
    <div className="workplace__content-top workplace__content-top_bottom">
      <div className="workplace__container workplace__container_third">
        

        <div className="workplace__container-image workplace__container-image_third">
          <div className="workplace__image-wrapper workplace__image-wrapper_third">
            <AnimatePresence initial={false}>
              <motion.img
                className="workplace__image workplace__image_bottom"
                key={imageIndexTop}
                src={workplaceSlider3Images[imageIndexTop]}
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
          <div className="workplace__sliders workplace__sliders_third">
            {workplaceSlider3Images.map((image, index) => (
              <div
                className="workplace__slider-container workplace__slider-container_bottom"
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
                    {workplaceSlider3Titles[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="workplace__container-text workplace__container-text_third">
          <h2 className="workplace__title workplace__title_third_bottom">{workplaceDescTexts.find((item) => item.id === 3).title}</h2>
          <p className="workplace__text workplace__text_bottom">
          {workplaceDescTexts.find((item) => item.id === 3).textTop}
          </p>
          <ul className="workplace__list workplace__list_bottom">
          {workplaceDescTexts
              .find((item) => item.id === 3)
              ?.points?.map((point, index) => (
                <li key={index} className="workplace__list-item">
                  {splitDescription(point)}
                </li>
              ))}
          </ul>
          <p className="workplace__text workplace__text_bottom">
          {workplaceDescTexts.find((item) => item.id === 3).textBottom}
          </p>
        </div>
      </div>
      <div className="workplace__container workplace__container_fourth">
      <div className="workplace__container-image workplace__container-image_fourth">
          <div className="workplace__image-wrapper workplace__image-wrapper_fourth">
            <AnimatePresence initial={false}>
              <motion.img
                className="workplace__image"
                key={imageIndexBottom}
                src={workplaceSlider4Images[imageIndexBottom]}
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
          <div className="workplace__sliders workplace__sliders_fourth">
            {workplaceSlider4Images.map((image, index) => (
              <div
                className="workplace__slider-container workplace__slider-container_bottom"
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
                    {workplaceSlider4Titles[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="workplace__container-text workplace__container-text_fourth">
        <h2 className="workplace__title workplace__title_fourth_bottom">
        {workplaceDescTexts.find((item) => item.id === 4).title}
      </h2>
          <p className="workplace__text workplace__text_bottom">
          {workplaceDescTexts.find((item) => item.id === 4).textTop}
          </p>
          <ul className="workplace__list workplace__list_bottom">
          {workplaceDescTexts
              .find((item) => item.id === 4)
              ?.points?.map((point, index) => (
                <li key={index} className="workplace__list-item">
                {splitDescription(point)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceBottom;
