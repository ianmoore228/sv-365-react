import "./createBar.css";
import { useLocation } from "react-router-dom";
import createBarData from "./createBar-data";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const splitDescription = (text) => {
  const parts = text.split(":");
  if (parts.length === 2) {
    return (
      <>
        <span>{parts[0]}:</span>
        {parts[1]}
      </>
    );
  }
  return text;
};

const CreateBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const createBarDataObj = createBarData.find(
    (item) => item.path === currentPath
  );

  const createBarCardTitles = createBarDataObj?.cardTitles || [];
  const createBarCardAllTexts = createBarDataObj?.cardTexts || [];
  const createBarDescriptionTexts = createBarDataObj?.descriptionTexts || [];

  const createBarTitle = createBarDataObj?.title || "";
  const createBarTopImage = createBarDataObj?.topImage || "";
  const createBarBottomImage = createBarDataObj?.bottomImage || "";
  const createBarBottomImageInfo = createBarDataObj?.bottomImageInfo || "";

  return (
    <div className="create-bar">
      <div className="create-bar__wrapper">
        <div className="create-bar__background"></div>
        <h1 className="create-bar__title">{createBarTitle}</h1>
        <p className="create-bar__subtitle">
          Составляйте барную карту, которая понравится вашим гостям. Легко
          модифицируйте заказы в зависимости от их предпочтений.
        </p>
        <div className="create-bar__container create-bar__container_top">
          <div className="create-bar__content-left">
            <img
              className={`create-bar__image create-bar__image_left`}
              src={createBarTopImage}
              alt="Top bar image"
            />
          </div>
          <div className="create-bar__content-right">
            {createBarCardTitles.map((title, cardIndex) => (
              <div className="create-bar__content-card-wrapper" key={`card-wrapper-${cardIndex}`}>
                <div className="create-bar__content-card">
                  <h3 className="create-bar__card-title">{title}</h3>
                  {createBarCardAllTexts[cardIndex]?.map((text, textIndex) => {
                    const ref = useRef(null);
                    const isInView = useInView(ref, { once: true });

                    return (
                      <motion.p
                        ref={ref}
                        initial={{ x: -150, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.2 * textIndex,
                          type: "spring",
                        }}
                        className="create-bar__card-item"
                        key={`card-text-${cardIndex}-${textIndex}`}
                      >
                        {text}
                      </motion.p>
                    );
                  })}
                </div>
                {createBarDescriptionTexts[cardIndex]?.map((text, descriptionIndex) => {
                  const ref = useRef(null);
                  const isInView = useInView(ref, { once: true });
                  return (
                    <div
                      key={`description-${cardIndex}-${descriptionIndex}`}
                      className="create-bar__content-card-description"
                      ref={ref}
                    >
                      <motion.p
                        initial={{ x: -150, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.2 * cardIndex,
                          type: "spring",
                        }}
                        className="create-bar__description"
                      >
                        {splitDescription(text)}
                      </motion.p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="create-bar__container create-bar__container_bottom">
          <div className="create-bar__content-left create-bar__content-left_bottom">
            <h1 className="create-bar__title create-bar__title_bottom">Себестоимость</h1>
            <p className="create-bar__subtitle create-bar__subtitle_bottom">
              Мгновенный расчет себестоимости помогает вам контролировать
              наценку и оптимизировать прибыль.
            </p>
          </div>
          <div className="create-bar__content-right create-bar__content-right_bottom">
            <img
              src={createBarBottomImage}
              className="create-bar__bottom-image"
              alt="Bottom bar image"
            />
            <img
              src={createBarBottomImageInfo}
              className="create-bar__bottom-image-info"
              alt="Bottom image info"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBar;
