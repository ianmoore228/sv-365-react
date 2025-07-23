import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./description.css";
import buttons from "./data/buttons-data.js";
import cards from "./data/cards-data.js";
import subtext from "./data/subtexts-data.js";
import images from "./data/images-data.js";
import arrow from "../../../assets/images/arrow.png";
import { wrap } from "popmotion";

const Description = () => {
  const initialImage = images.find((image) => image.category === "card1");
  const [selectedCategory, setSelectedCategory] = useState("card1");
  const [activeButtonId, setActiveButtonId] = useState("Маркетинг");
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [page, setPage] = useState(0);
  const intervalRef = useRef(null);
  const [isOpen, setIsOpen] = useState({});
  const [firstRender, setFirstRender] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  // console.log(isOpen);

  const subtextMapping = {
    1: "text1",
    2: "text2",
    3: "text3",
    4: "text4",
    5: "text5",
    6: "text6",
    7: "text7",
    8: "text8",
    9: "text9",
    10: "text10",
    11: "text11",
    12: "text12",
    13: "text13",
    14: "text14",
    15: "text15",
    16: "text16",
    17: "text17",
  };

  const categoryMapping = {
    Маркетинг: "card1",
    "Создай свой интернет магазин": "card2",
    "Создай свое приложение": "card3",
    "Создавай товары": "card4",
    "Управляй товарами": "card5",
    "Создай мультибренд": "card6",
    "Обучение и контроль сотрудников": "card7",
    "Складской учет": "card8",
  };

  const handleButtonClick = (id) => {
    const category = categoryMapping[id];
    setSelectedCategory(category);
    setActiveButtonId(id);
    const firstImage = images.find((image) => image.category === category);
    setSelectedImage(firstImage);
    setPage(0);
    setAnimationDone(false);
    setFirstRender(false);
    setIsOpen({});
  };

//   console.log(animationDone)
// console.log(firstRender)

  setTimeout(() => {
    setAnimationDone(true);
  }, 100);

  const handleTabClick = (id) => {
    setIsOpen((prev) => ({
      [id]: !prev[id], 
    }));
    setAnimationDone(true);
    setFirstRender(true);
  };

  const filteredCards = cards.filter(
    (card) => card.category === selectedCategory
  );
  const filteredImages = images.filter(
    (image) => image.category === selectedCategory
  );
  const imageIndex = wrap(0, filteredImages.length, page);

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
      setPage((prevPage) => (prevPage + 1) % filteredImages.length);
    }, 3000);
  };

  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section className="description">
      <div className="description__wrapper">
        <h1 className="description__title">
          Описание программы и ее преимущества
        </h1>
        <div className="description__content">
          <div className="description__buttons">
            {buttons.map((button) => (
              <motion.div
                key={button.id}
                className={`description__tab ${
                  activeButtonId === button.title ? "active" : ""
                }`}
                whileTap={{
                  top: -20,
                  transition: { duration: 0.2, type: "spring" },
                }}
                onClick={() => handleButtonClick(button.title)}
              >
                <p className="description__tab-text">{button.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="description__images">
            <motion.img
              key={filteredImages[imageIndex].image}
              src={filteredImages[imageIndex].image}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
              }}
              className="description__image"
              alt={`Selected Image ${selectedImage.id}`}
            />
            <div className="description__sliders">
              {filteredImages.map((image, index) => (
                <div
                  onClick={() => imagePaginate(index)}
                  className={`description__slider ${
                    filteredImages[imageIndex].id === image.id
                      ? "active-slider"
                      : ""
                  }`}
                  key={index}
                ></div>
              ))}
            </div>
          </div>

          <div className="description__right">
            <div className="description__cards">
              {filteredCards.map((card, index) => (
                <motion.div
                  onClick={() => handleTabClick(card.id)}
                  key={card.id}
                  className="description__card"
                  initial={{ marginBottom: "-100px", y: -60, opacity: 0 }}
                  animate={{
                    marginBottom: isOpen[card.id] ? "0px" : "-100px",
                    y: 0,
                    opacity: 1,
                    // height: isOpen[card.id] ? "auto" : 200,
                  }}
                  transition={{
                    duration: animationDone ? 0.2 : 0.5,
                    delay: firstRender ? 0 : animationDone ? 0 : 0.2 * index,
                  }}
                  whileTap={{
                    top: -20,
                    transition: { duration: 0.2, type: "spring" },
                  }}
                >
                  <div className="description__card-title-wrapper">
                    <p className="description__card-title">{card.title}</p>
                    <span>
                      <motion.img
                        src={arrow}
                        animate={{
                          rotate: isOpen[card.id] ? 180 : 0,
                          transition: { duration: 0.4, type: "spring" },
                        }}
                      />
                    </span>
                  </div>

                  <AnimatePresence>
                    {isOpen[card.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="description__text-content"
                      >
                        {subtext
                          .filter(
                            (text) => text.category === subtextMapping[card.id]
                          )
                          .map((text, newindex) => (
                            <motion.div
                              initial={{ scale: 0.3, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              // exit={{ scale: 0.3, opacity: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.1 * newindex,
                                type: "spring",
                                bounce: 0.15
                              }}
                              key={text.id}
                              className="description__text-container"
                            >
                              <p className="description__text">{text.title}</p>
                              <hr />
                            </motion.div>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
