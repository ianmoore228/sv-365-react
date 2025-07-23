import "../createApp.css";
import { useLocation } from "react-router-dom";
import createAppData from "../createApp-data";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";

const CreateAppTop = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const createAppDataObj = createAppData.find(
    (item) => item.path === currentPath
  );

  const createAppTitle = createAppDataObj ? createAppDataObj.title : "";
  const createAppTopText = createAppDataObj ? createAppDataObj.topText : "";
  const createAppBottomText = createAppDataObj ? createAppDataObj.bottomText : "";
  const createAppPoints = createAppDataObj ? createAppDataObj.points : [];
  const createAppImages = createAppDataObj ? createAppDataObj.images : [];
  const createAppSliderTexts = createAppDataObj
    ? createAppDataObj.sliderTexts
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedImagesRef = useRef(createAppImages);
  const intervalRef = useRef(null); 

  const startAutoChange = () => {
    if (intervalRef.current) return; 

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedImagesRef.current.length);
    }, 3000);
  };

  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  React.useLayoutEffect(() => {
    startAutoChange();
    return () => stopAutoChange(); 
  }, []);

  const handleSliderClick = (imageIndex) => {
    setCurrentIndex(imageIndex);
    stopAutoChange(); 
    setTimeout(startAutoChange);
  };

  return (
    <div className="solution-create-app__container-top">
      <div className="solution-create-app__content-left-text">
        <h2 className="solution-create-app__title">{createAppTitle}</h2>
        <p className="solution-create-app__text">{createAppTopText}</p>
        <ul className="solution-create-app__list">
          {createAppPoints.map((point, index) => (
            <li className="solution-create-app__list-item" key={index}>
              {point}
            </li>
          ))}
        </ul>
        <p className="solution-create-app__text">{createAppBottomText}</p>
      </div>
      <div className="solution-create-app__content-right-image">
        <div className="solution-create-app__image-container-top">
          {selectedImagesRef.current.length > 0 &&
            selectedImagesRef.current.map((image, index) => (
              <motion.img
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{
                  y: currentIndex === index ? 0 : 10,
                  opacity: currentIndex === index ? 1 : 0,
                }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                }}
                src={image}
                alt={`Selected Image ${index}`}
                className="solution-create-app__image-top"
                style={{
                  position: "absolute",
                    opacity: currentIndex === index ? 1 : 0,
                }}
              />
            ))}
        </div>
        <div className="solution-create-app__sliders solution-create-app__slider-container_top">
          {selectedImagesRef.current.map((image, index) => (
            <div
              onClick={() => handleSliderClick(index)}
              className={`solution-create-app__slider ${
                currentIndex === index ? "active-slider" : ""
              }`}
              key={index}
            >
              <div
                className={`solution-create-app__slider-text-container ${
                  currentIndex === index ? "active-slider-text" : ""
                }`}
              >
                <p className="solution-create-app__slider-text">
                  {createAppSliderTexts[index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateAppTop;
