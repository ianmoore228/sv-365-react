import "./education.css";
import educationTexts from "./education-data.js";
import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

const Education = React.forwardRef((props, refSection) => {
  const [pages, setPages] = useState(educationTexts.map(() => 0));
  const intervalRefs = useRef([]);

  const refs = useRef(educationTexts.map(() => React.createRef()));

  const startAutoChange = (index) => {
    if (intervalRefs.current[index]) return;
    intervalRefs.current[index] = setInterval(() => {
      setPages((prevPages) =>
        prevPages.map((page, i) =>
          i === index
            ? (page + 1) % educationTexts[index].sliderImages.length
            : page
        )
      );
    }, 3000);
  };

  const stopAutoChange = (index) => {
    if (intervalRefs.current[index]) {
      clearInterval(intervalRefs.current[index]);
      intervalRefs.current[index] = null;
    }
  };

  useEffect(() => {
    educationTexts.forEach((_, index) => {
      startAutoChange(index);
    });

    return () => {
      educationTexts.forEach((_, index) => stopAutoChange(index));
    };
  }, []);

  const imagePaginate = (sliderIndex, newIndex) => {
    setPages((prevPages) =>
      prevPages.map((page, i) => (i === sliderIndex ? newIndex : page))
    );
    stopAutoChange(sliderIndex);
    startAutoChange(sliderIndex);
  };

  return (
    <div className="education" id="education">
      {educationTexts.map((item, sliderIndex) => {
        const isInView = useInView(refs.current[sliderIndex], { once: true });
        return (
          <div
            key={sliderIndex}
            className={`education__background education__background_${item.id}`}
          >
            <div className="education__wrapper">
              <div
                className={`education__container education__container_${item.style}`}
              >
                <h1 className="education__title">{item.title}</h1>
                <div
                  ref={refs.current[sliderIndex]}
                  className="education__text-container"
                >
                  <motion.h2
                    style={{
                      transform: isInView ? "none" : "translateY(-150px)",
                      opacity: isInView ? 1 : 0,
                      transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
                    }}
                    className="education__subtitle"
                  >
                    {item.topText}
                  </motion.h2>
                  <ul className="education__list">
                    {item.points.map((point, pointIndex) => (
                      <motion.li
                        initial={{
                          x: isInView ? -150 : -150,
                          opacity: isInView ? 0 : 0,
                        }}
                        animate={{
                          x: isInView ? 0 : -150,
                          opacity: isInView ? 1 : 0,
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.2 * pointIndex,
                          type: "spring",
                        }}
                        key={`list-item-${pointIndex}`}
                        className="education__list-item"
                      >
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                  <p className="education__text">{item.bottomText}</p>
                </div>
                <div className="education__sliders">
                  <div className="education__image-container">
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={pages[sliderIndex]}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{
                          duration: 1,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className="education__image"
                        src={item.sliderImages[pages[sliderIndex]]}
                      />
                    </AnimatePresence>
                  </div>
                  <div className="education__slider-container">
                    {item.sliderTexts.map((text, textIndex) => (
                      <div
                        className="education__slider-wrapper"
                        onClick={() => imagePaginate(sliderIndex, textIndex)}
                        key={`slider-text-${textIndex}`}
                      >
                        <div
                          className={`education__slider ${
                            pages[sliderIndex] === textIndex
                              ? "active-slider"
                              : ""
                          }`}
                        ></div>
                        <p
                          className={`education__slider-text ${
                            pages[sliderIndex] === textIndex
                              ? "active-slider-text"
                              : ""
                          }`}
                        >
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default Education;
