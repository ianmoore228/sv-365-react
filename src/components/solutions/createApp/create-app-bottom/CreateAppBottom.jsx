import "../createApp.css";  
import { useLocation } from "react-router-dom";
import createAppData from "../createApp-data";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import img1 from "../../../../assets/images/solutions/appStore.jpg";
import img2 from "../../../../assets/images/solutions/googleStore.jpg";

const CreateAppBottom = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const createAppDataObj = createAppData.find(
    (item) => item.path === currentPath
  );

  const createAppBottomImages = createAppDataObj
    ? createAppDataObj.imagesBottom
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedBottomImagesRef = useRef(createAppBottomImages); 
  const intervalRef = useRef(null); 

  const startAutoChange = () => {
    if (intervalRef.current) return; 

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedBottomImagesRef.current.length);
    }, 3000);
  };

  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  React.useEffect(() => {
    startAutoChange();
    return () => stopAutoChange(); 
  }, []);

  const handleBottomSliderClick = (imageIndex) => {
    setCurrentIndex(imageIndex);
    stopAutoChange(); 
    setTimeout(startAutoChange); 
  };

  return (
    <div className="solution-create-app__container-bottom">
      <div className="solution-create-app__content-left-image">
        <div className="solution-create-app__image-container-bottom">
          <div className="solution-create-app__image-wrapper-bottom">
            {selectedBottomImagesRef.current.length > 0 && 
              selectedBottomImagesRef.current.map((image, index) => (
                <motion.img
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{
                    y: currentIndex === index ? 0 : 40,
                    opacity: currentIndex === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  src={image}
                  alt={`Selected Image ${index}`}
                  className="solution-create-app__image-bottom"
                  style={{
                    position: "absolute",
                    opacity: currentIndex === index ? 1 : 0,
                  }}
                />
              ))
            }
          </div>
          <div className="solution-create-app__sliders solution-create-app__slider-container_bottom">
            {selectedBottomImagesRef.current.map((image, index) => (
              <div
                onClick={() => handleBottomSliderClick(index)}
                className={`solution-create-app__slider solution-create-app__slider_bottom ${
                  currentIndex === index ? "active-slider" : ""
                }`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="solution-create-app__content-right-text">
        <h3 className="solution-create-app__subtitle">
          Скачайте своё приложение в Google Play и App Store:
        </h3>
        <ul className="solution-create-app__app-list">
          <li className="solution-create-app__app-list-item">Android:</li>
          <li className="solution-create-app__app-list-item solution-create-app__app-list-item_indent">
            Откройте Google Play, найдите своё приложение и нажмите
            "Установить".
          </li>
          <li className="solution-create-app__app-list-item">iOS:</li>
          <li className="solution-create-app__app-list-item solution-create-app__app-list-item_indent">
            Откройте App Store, найдите своё приложение и нажмите "Получить".
          </li>
        </ul>
        <p className="solution-create-app__text">
          Устанавливайте и пользуйтесь всеми функциями: меню, заказы, акции!
        </p>
        <div className="solution-create-app__card">
          <div className="solution-create-app__card-container">
            <h2 className="solution-create-app__card-subtitle_bottom">Скачивайте и открывайте для себя новые возможности!</h2>
            <div className="solution-create-app__card-images">
              <img src={img1} alt="App Store" className="solution-create-app__card-image"/>
              <img src={img2} alt="Google Store" className="solution-create-app__card-image"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppBottom;
