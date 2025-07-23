import "./questionForm.css";
import img from "../../../assets/images/tariffs/contact.png";
import { motion } from "framer-motion";
import Wordsearch from "../../wordsearch/Wordsearch";
import { useState } from "react";

const QuestionForm = () => {
  const [isWordsearchOpen, setIsWordsearchOpen] = useState(false);


  const handleClick = (e) => {
    e.preventDefault();
    openWordsearch();
    

    // alert ("Ваша заявка принята! (нет)");
  };

  

  const openWordsearch = () => {
    setIsWordsearchOpen(true);
  };

  const closeWordsearch = () => {
    setIsWordsearchOpen(false);
  };


  // console.log(isWordsearchOpen)


  return (
    <>
    <div id="contacts" className="question-form">
      <div className="question-form__wrapper">
      <h1 className="question-form__title">Остались вопросы?</h1>
        <div className="question-form__container">
          <div className="question-form__content">
            <h2 className="question-form__text">Заполни заявку</h2>
            <form className="question-form__form">
            <input className="question-form__input question-form__input_name" placeholder="Фио"></input>
            <input className="question-form__input question-form__input_phone" placeholder="Телефон"></input>
            <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 5px 3px  #05002731" }}
             onClick={handleClick} className="question-form__button">Открыть</motion.button>
            </form>
          </div>
          <img src={img} className="question-form__image" />
        </div>
      </div>
    </div>
    {isWordsearchOpen && (
    <Wordsearch isWordsearchOpen={openWordsearch} closeWordsearch={() => closeWordsearch()} />
    )}
    </>
    
  );
};

export default QuestionForm;
