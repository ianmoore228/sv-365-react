import "./training.css";
import background from "../../../assets/images/about/training/block5-bg-top.png";
import img1 from "../../../assets/images/about/training/block5-1-0.png";
import img2 from "../../../assets/images/about/training/block5-1-1.png";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import texts from "./training-data";

const Training = React.forwardRef((props, refSection) => {
  const ref = useRef(null);

  const isInView = useInView(
   ref, {
     margin: "0px 0px 1200px 0px", once: true 
   });

   const motionSettings = (isInView, index) => ({
    ref: ref,
    initial: {
      x: isInView ? -50 : 0,
      opacity: isInView ? 0 : 0,
    },
    animate: {
      x: isInView ? 0 : -50,
      opacity: isInView ? 1 : 0,
    },
    transition: {
      duration: 1,
      delay: index * 0.2,
      type: "spring",
    },
  });

  return (

    <section ref={refSection} className="training">
      <img className="training__background" src={background}/>
      <div className="training__wrapper">
        <h1 className="training__title">Обучай персонал</h1>
        <div className="training__container training__container-top">
          <motion.div
            ref={ref}
            style={{
              transform: isInView ? "none" : "translateY(150px)",
              opacity: isInView ? 1 : 0,
              transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
            }}
            className="training__item training__item-first"
          >
            {texts
              .map((text, index) => (
                <motion.p
                 {...motionSettings(isInView, index)}
                  key={text.id}
                  className={"training__item_text"}
                >
                  {text.text}
                </motion.p>
              ))
              .slice(0, 4)}
          </motion.div>
          <motion.img
            ref={ref}
            style={{
              transform: isInView ? "none" : "translateY(150px)",
              opacity: isInView ? 1 : 0,
              transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
            }}
            src={img1}
            alt=""
            className="training__item_img training__item_img-first"
          />
          <div className="training__item training__item-second">
          {texts
              .map((text, index) => (
                <motion.p
                {...motionSettings(isInView, index)}
                  key={text.id}
                  className={"training__item_text"}
                >
                  {text.text}
                </motion.p>
              ))
              .slice(4, 7)}
          </div>
        </div>
        <div className="training__container training__container-bottom">
          <div className="training__item training__item-third">
            <motion.h3
             ref={ref}
                  initial={{
                    x: isInView ? -50 : 0,
                    opacity: isInView ? 0 : 0,
                  }}
                  animate={{
                    x: isInView ? 0 : -50,
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.2,
                    type: "spring",
                  }}
             className="training__item_subtitle">
              «УмныйТрекер» - сервис по отслеживанию статуса заказа
            </motion.h3>
            {texts
              .map((text, index) => (
                <motion.p
                 {...motionSettings(isInView, index)}
                  key={text.id}
                  className={"training__item_text"}
                >
                  {text.text}
                </motion.p>
              ))
              .slice(7, 9)}
            <motion.h4
             ref={ref}
                  initial={{
                    x: isInView ? -50 : 0,
                    opacity: isInView ? 0 : 0,
                  }}
                  animate={{
                    x: isInView ? 0 : -50,
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.7,
                    type: "spring",
                  }}
             className="training__item_subtitle-additional">Дополнительные функции:</motion.h4>
            {texts
              .map((text, index) => (
                <motion.p
                 {...motionSettings(isInView, index)}
                  key={text.id}
                  className={"training__item_text"}
                >
                  {text.text}
                </motion.p>
              ))
              .slice(9, 12)}
          </div>
          <motion.img
           ref={ref}
            style={{
              transform: isInView ? "none" : "translateY(300px)",
              opacity: isInView ? 1 : 0,
              transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.7s",
            }}
            src={img2}
            alt=""
            className="training__item_img training__item_img-second"
          />
        </div>
      </div>
    </section>
 );
});
export default Training;
