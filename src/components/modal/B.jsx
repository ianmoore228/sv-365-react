const B = () => {
  return (
    <>
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
            className="modal__content"
          >
            <button
              onClick={() => {
                closeModal();
                setIsStartClicked(false);
              }}
              className="modal__button-close"
            >
              ×
            </button>
            <h2 className="modal__title">Вход в личный кабинет</h2>
            <form id="form" className="modal__form" onSubmit={handleLogin}>
              <div className="modal__input-container">
                <input
                  className="modal__input modal__input_code"
                  placeholder="Введите код"
                />
              </div>
              <div className="modal__buttons-wrapper">
                <button
                  type="submit"
                  className="modal__button modal__button_login"
                >
                  Войти
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    openRegisterModal();
                  }}
                  className="modal__button modal__button_register"
                >
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default B;
