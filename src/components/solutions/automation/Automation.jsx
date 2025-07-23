import "./automation.css";
import atolSigma from "../../../assets/images/solutions/automation/atol_sigma.png";
import terminal from "../../../assets/images/solutions/automation/terminal.png";
import automationTexts from "./automation-data.js";

const Automation = () => {
  const automationFirstCardTexts = automationTexts ? automationTexts.firstCardTexts : "";
  const automationSecondCardTexts = automationTexts ? automationTexts.secondCardTexts : "";

  return (
    <div id="automation" className="automation">
      <div className="automation__wrapper">
        <h1 className="automation__title">Автоматизация и оборудование</h1>
        <p className="automation__text">
          Поможем запустить бизнес быстрее и дешевле
        </p>
        <img src={terminal} className="automation__image" />
        <h1 className="automation__title automation__title_bottom">Готовые комплекты оборудования</h1>
        <div className="automation__container">
          <div className="automation__card automation__card_left">
            <img src={atolSigma} className="automation__card-image" />
            <h3 className="automation__card-title">Базовый 1 (54 ФЗ)</h3>
            <ul className="automation__card-list">
              {automationFirstCardTexts.map((item, index) => (
                <li className="automation__card-item" key={index}>{item}</li>
              ))}
            </ul>
            <button className="automation__card-button">Выбрать</button>
          </div>
          <div className="automation__card automation__card_right">
            <img src={atolSigma} className="automation__card-image" />
            <h3 className="automation__card-title">Базовый 4 (БЕЗ ОНЛАЙН КАССЫ)</h3>
            <ul className="automation__card-list">
              {automationSecondCardTexts.map((item, index) => (
                <li className="automation__card-item" key={index}>{item}</li>
              ))}
            </ul>
            <button className="automation__card-button">Выбрать</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
