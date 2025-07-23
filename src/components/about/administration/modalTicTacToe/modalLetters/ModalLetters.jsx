import "./modalLetters.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { openDoomModal, closeLettersModal } from '../../../../../redux/deleteModalSlice.jsx';

const ModalLetters = ({ showLettersModal, closeLettersModal }) => {
  const dispatch = useDispatch();
  const isLettersModalOpen = useSelector((state) => state.deleteModal.isLettersModalOpen);

  const [numbers, setNumbers] = useState([]);
  
  const [squares, setSquares] = useState(
    Array.from({ length: 11 }, (_, index) => ({
      x: 0,
      y: 0,
      value: index === 10 ? "←" : index, 
    }))
  );

  const activationRadius = 170;
  const clickRadius = 42;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      setSquares((prevSquares) =>
        prevSquares.map((square, index) => {
          const squareElement = document.querySelector(
            `.modal__game-number_${index}`
          );

          if (!squareElement) return square;

          const rect = squareElement.getBoundingClientRect();
          const squareCenterX = rect.left + rect.width / 2;
          const squareCenterY = rect.top + rect.height / 2;

          const deltaX = squareCenterX - mouseX;
          const deltaY = squareCenterY - mouseY;
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

          let offsetX = 0;
          let offsetY = 0;

          if (distance < activationRadius) {
            const force = activationRadius - distance;
            offsetX = (deltaX / distance) * force;
            offsetY = (deltaY / distance) * force;
          }

          return {
            x: offsetX,
            y: offsetY,
            value: square.value, 
          };
        })
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleGlobalClick = (e) => {
    let closestSquare = null;
    let minDistance = Infinity;

    squares.forEach((square, index) => {
      const squareElement = document.querySelector(`.modal__game-number_${index}`);
      const rect = squareElement.getBoundingClientRect();
      const squareCenterX = rect.left + rect.width / 2;
      const squareCenterY = rect.top + rect.height / 2;

      const deltaX = squareCenterX - e.clientX;
      const deltaY = squareCenterY - e.clientY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < clickRadius && distance < minDistance) {
        minDistance = distance;
        closestSquare = index;
      }
    });

    if (closestSquare !== null) {
      if (closestSquare === 10) {
        setNumbers((prevNumbers) => prevNumbers.slice(0, prevNumbers.length - 1)); 
      } else {
        setNumbers((prevNumbers) => [...prevNumbers, squares[closestSquare].value]); 
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [squares]);

  if (!isLettersModalOpen) return null;

  return (
    <>
      <motion.div
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {squares.map((square, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              transition: `all 1.5s cubic-bezier(0.23, 1, 0.32, 1)`,
              transform: `translate(${square.x}px, ${square.y}px)`,
            }}
            className={`modal__game-number modal__game-number_${index}`}
          >
            {square.value}
          </div>
        ))}
        <div className="modal__wrapper">
          <motion.div
            initial={{ transform: "translateY(-100%)" }}
            animate={{ transform: "translateY(0%)" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="modal__content"
          >
            <button onClick={closeLettersModal} className="modal__button-close">
              ×
            </button>
            <h2 className="modal__title modal__title_letters">Удаление аккаунта</h2>
            <p className="modal__text modal__text_letters">
              Введите свой телефон, используя данную клавиатуру:
            </p>
            <input
              maxLength={20}
              className="modal__input modal__input_phone modal__input_phone_letters"
              placeholder="phone"
              value={numbers.join("")}
              readOnly
            />
           <button 
            disabled={numbers.length !== 10}
           onClick={() => {dispatch(openDoomModal())}} className="modal__button modal__button_letters">Продолжить</button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ModalLetters;
