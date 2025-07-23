import { motion } from "framer-motion";
import "../modal.css";
import "./passwordModal.css";

const PasswordModal = ({ isPasswordModalOpen, closePasswordModal }) => {

const handleClick = () => {
// e.PreventDefault();
console.log("ТЫК")
}


  if (!isPasswordModalOpen) return null;
  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="modal__wrapper">
        <motion.div
          initial={{ transform: "translateY(-100%)" }}
          animate={{ transform: "translateY(0%)" }}
          transition={{ duration: 0.5, type: "spring" }}
          className="modal__content modal__content_password"
        >
           <button
              onClick={() =>{ closePasswordModal() }}
              className="modal__button-close"
            >
              ×
            </button>
          <h1>Смените пароль!</h1>
          <p className="modal__text">Введите свою электронную почту:</p>
          <input
                  maxLength={100}
                  className="modal__input modal__input_email"
                  placeholder="E-mail"
                  type="email"
                  // value={phone}
                />
                <button
                type="button"
                onClick={handleClick}
                 className="modal__button modal__button_password">Отправить код</button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PasswordModal;
