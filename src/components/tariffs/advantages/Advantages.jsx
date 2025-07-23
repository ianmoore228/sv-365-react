import "./advantages.css";
import advantagesData from "./advantages-data";
import img1 from "../../../assets/images/tariffs/block22-1-3-new.png";
import img2 from "../../../assets/images/tariffs/block29-mail-1.png";
import img3 from "../../../assets/images/tariffs/block5-1-0.png";
import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

const Advantages = () => {
  const refTitle = useRef(null);
  const refSubtitleFirst = useRef(null);
  const refSubtitleSecond = useRef(null);
  const refSubtitleThird = useRef(null);
  const isInViewTitle = useInView(refTitle, { once: true });
  const isInViewSubtitleFirst = useInView(refSubtitleFirst, { once: true });
  const isInViewSubtitleSecond = useInView(refSubtitleSecond, { once: true });
  const isInViewSubtitleThird = useInView(refSubtitleThird, {once: true});


  const advantageDataFirst = advantagesData.find((item) => item.id === 1);
  const advantageDataSecond = advantagesData.find((item) => item.id === 2);

  return (
    <div id="advantages" className="advantages">
      <div className="advantages__wrapper">
        <motion.h1
          ref={refTitle}
          style={{
            transform: isInViewTitle ? "none" : "translateY(-150px)",
            opacity: isInViewTitle ? 1 : 0,
            transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
          }}
          className="advantages__title"
        >
          Что входит в тариф?
        </motion.h1>
        <div className="advantages__container advantages__container_first">
          <div className="advantages__content advantages__content_left">
            <motion.h2
              ref={refSubtitleFirst}
              style={{
                transform: isInViewSubtitleFirst
                  ? "none"
                  : "translateY(-150px)",
                opacity: isInViewSubtitleFirst ? 1 : 0,
                transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
              }}
              className="advantages__container-title"
            >
              Сайт конструктор
            </motion.h2>
            <p className="advantages__container-text">
              Создай свой сайт и так далее текст еще текст далеее
            </p>
          </div>
          <div className="advantages__content advantages__content_right">
            <img
              src={img1}
              alt="img1"
              className="advantages__image advantages__image_first"
            />
          </div>
        </div>
        <div className="advantages__container advantages__container_second">
          <img
            src={img2}
            alt="img2"
            className="advantages__image advantages__image_second"
          />
          <div className="advantages__content advantages__content_right">
            <motion.h2
              ref={refSubtitleSecond}
              style={{
                transform: isInViewSubtitleSecond
                  ? "none"
                  : "translateY(-150px)",
                opacity: isInViewSubtitleSecond ? 1 : 0,
                transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
              }}
              className="advantages__container-title"
            >
              {advantageDataFirst.title}
            </motion.h2>
            <ul className="advantages__list">
              {advantageDataFirst.points.map((point, index) => {
                const ref = useRef(null);
                const isInView = useInView(ref, { once: true });
                return (
                  <motion.li
                   key={`advantage-first-${index}`} 
                    initial={{ x: -150, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.2 * index,
                      type: "spring",
                    }}
                    ref={ref}
                    className="advantages__container-list-item"
                  >
                    {point}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="advantages__container advantages__container_third">
          <div className="advantages__content advantages__content_top">
            <motion.h2
             ref={refSubtitleThird}
              style={{
                transform: isInViewSubtitleThird
                  ? "none"
                  : "translateY(-150px)",
                opacity: isInViewSubtitleThird ? 1 : 0,
                transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
              }}
             className="advantages__container-title advantages__container-title_third">
              {advantageDataSecond.title}
            </motion.h2>
            <img
              src={img3}
              alt="img2"
              className="advantages__image advantages__image_third"
            />
          </div>
          <div className="advantages__content advantages__content_bottom">
            <ul className="advantages__list">
              {advantageDataSecond.points.map((point, index) => {
                const ref = useRef(null);
                const isInView = useInView(ref, { once: true });
                return (
                  <motion.li
                   key={`advantage-second-${index}`} 
                    initial={{ x: -150, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.2 * index,
                      type: "spring",
                    }}
                    ref={ref}
                    className="advantages__container-list-item"
                  >
                    {point}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
