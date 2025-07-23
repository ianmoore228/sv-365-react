import "./administration.css";
import img1 from "../../../assets/images/about/administration/footer__main-new.png";
import img2 from "../../../assets/images/about/administration/footer__pc.png";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Modal from "./modalTicTacToe/Modal.jsx";
import ModalLetters from "./modalTicTacToe/modalLetters/ModalLetters.jsx";
import ModalGame from "./modalTicTacToe/modalLetters/modalDoom/modalGame.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  openDeleteModal,
  closeDeleteModal,
  closeLettersModal,
  closeDoomModal,
} from "../../../redux/deleteModalSlice.jsx";

const Administration = () => {
  const isDeleteModalOpen = useSelector(
    (state) => state.deleteModal.isDeleteModalOpen
  );
  const isLettersModalOpen = useSelector(
    (state) => state.deleteModal.isLettersModalOpen
  );
  const isDoomModalOpen = useSelector(
    (state) => state.deleteModal.isDoomModalOpen
  );

  console.log("isDeleteModalOpen", isDeleteModalOpen);

  const dispatch = useDispatch();

  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "0px 0px 800px 0px",
    once: true,
  });

  return (
    <>
      <section id="administration" className="administration">
        <div className="administration__wrapper">
          <div className="administration__content">
            <motion.h1
              ref={ref}
              style={{
                transform: isInView ? "none" : "translateY(-150px)",
                opacity: isInView ? 1 : 0,
                transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
              }}
              className="administration__title"
            >
              Централизованное администрирование бизнеса
            </motion.h1>
            <div className="administration__main">
              <img
                src={img1}
                className="administration__image administration__image_top"
              />
              <div className="administration__container administration__container-top">
                <motion.img
                  ref={ref}
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
                    delay: 0.2,
                    type: "spring",
                  }}
                  src={img2}
                  className="administration__image administration__image_bottom"
                />
                <div className="administration__text-container">
                  <motion.div
                    ref={ref}
                    style={{
                      transform: isInView ? "none" : "translateY(-150px)",
                      opacity: isInView ? 1 : 0,
                      transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
                    }}
                    className="administration__text-content administration__text-content_top"
                  >
                    <motion.p
                      ref={ref}
                      style={{
                        scale: isInView ? 1 : 0.5,
                        opacity: isInView ? 1 : 0,
                        transition:
                          "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
                      }}
                      className="administration__text"
                    >
                      Централизованное управление складом, производством,
                      кассовым оборудованием, сайтом и приложением через удобный
                      интерфейс. Контролируй аналитику и увеличивай доход!
                      Отчетность в режиме реального времени (количество заказов,
                      складские остатки, денежные потоки и многое другое).
                    </motion.p>
                    <motion.button
                      ref={ref}
                      style={{
                        transform: isInView ? "none" : "translateY(50px)",
                        opacity: isInView ? 1 : 0,
                        transition:
                          "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",
                      }}
                      className="administration__button"
                    >
                      Войти в личный кабинет
                    </motion.button>
                  </motion.div>
                  <motion.div
                    ref={ref}
                    style={{
                      scale: isInView ? 1 : 0.2,
                      opacity: isInView ? 1 : 0,
                      transition:
                        "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }}
                    className="administration__text-content administration__text-content_bottom"
                  >
                    <a
                      href="tel:+78129080900"
                      className="administration__phone"
                    >
                      8 812 908-09-00
                    </a>
                    <a
                      href="mailto:info@sv365.ru"
                      className="administration__email"
                    >
                      e-mail: office@sv365.ru
                    </a>
                    <p className="administration__address">
                      г. Калининград, ул Ленина, д 30
                    </p>
                  </motion.div>
                </div>
              </div>
              <motion.div
                ref={ref}
                style={{
                  scale: isInView ? 1 : 0.2,
                  opacity: isInView ? 1 : 0,
                  transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
                className="administration__container administration__container-bottom"
              >
                <p className="administration__legal">
                  ООО СВ ПРОФИ ИНН: 3900018221 КПП: 390001001 ОГРН:
                  1233900013027
                </p>
                <p className="administration__made-by">
                  Программное обеспечение «Свистунов» - разработка группы
                  компаний «СВ Профи»
                </p>
                <motion.button
                  onClick={() =>
                    dispatch(openDeleteModal(), console.log("ТЫк"))
                  }
                  className="administration__button-delete"
                  whileTap={{
                    scale: 0.9,
                    transition: { duration: 0.2, type: "spring" },
                  }}
                >
                  Удалить аккаунт
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {isDeleteModalOpen && (
        <Modal
          isDeleteModalOpen={isDeleteModalOpen}
          closeDeleteModal={() => dispatch(closeDeleteModal())}
        />
      )}
      {isLettersModalOpen && (
        <ModalLetters
          isLettersModalOpen={isLettersModalOpen}
          closeLettersModal={() => dispatch(closeLettersModal())}
        />
      )} 
       {isDoomModalOpen && (
        <ModalGame
          isDoomModalOpen={isDoomModalOpen}
          closeDoomModal={() => dispatch(closeDoomModal())}
        />
      )}
    </>
  );
};

export default Administration;
