import "./Wordsearch.css";
import { motion } from "framer-motion";
import "../modal/Modal.css";
import WordsearchGame from "./WordsearchGame.jsx";
import { useState } from "react";

const Wordsearch = ({ isWordsearchOpen, closeWordsearch }) => {
  const [isFound, setIsFound] = useState(false);
  const handleSubmit = () => {
    if (isFound) {
      console.log("Отправлено");
      localStorage.removeItem("wordsearch-grid");
      localStorage.removeItem("date");
      setTimeout(() => {
        closeWordsearch();
    }, 5000);
     
    } else {
      return
    }
  };


  if (!isWordsearchOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="modal wordsearch"
    >
      <motion.div
        initial={{ transform: "translateY(-100%)" }}
        animate={{ transform: "translateY(0%)" }}
        transition={{ duration: 0.5, type: "spring" }}
        className="modal__wrapper"
      >
        <div className="modal__content">
          <button
            onClick={() => closeWordsearch()}
            className="modal__button-close"
          >
            ×
          </button>
          <h1 className="wordsearch__title">Свяжитесь с нами!</h1>
          <h3 className="wordsearch__subtitle">Пожалуйста заполните форму</h3>
            <form
              id="wordsearch-form"
              className="wordsearch__form"
              // onSubmit={handleSubmit()}
            >
               <div className="modal__input-container">
              <input type="text" name="name" placeholder="Ваше имя" className="modal__input" />
              <input type="tel" name="phone" placeholder="Телефон" className="modal__input modal__input_wordsearch"/>
              </div>
              <WordsearchGame isFound={isFound} setIsFound={setIsFound}/>
              <button
              type="submit"
              onClick={() => handleSubmit()}
              style={{opacity:(isFound===true)?1:0.5, pointerEvents:(isFound===true)?"auto":"none"}}
               className="modal__button modal__button_wordsearch">Отправить</button>
            </form>
       
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Wordsearch;
