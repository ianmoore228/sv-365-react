import "./addOns.css";
import CLogo from "../../../assets/images/solutions/add-ons/1c.png";
import udsLogo from "../../../assets/images/solutions/add-ons/uds.png";
import staticsLogo from "../../../assets/images/solutions/add-ons/statics.png";

const AddOns = () => {
  return (
    <div className="add-ons" id="add-ons">
      <div className="add-ons__wrapper">
        <h1 className="add-ons__title">Интеграция дополнений</h1>
        <p className="add-ons__subtitle">Кастомизация под любой бизнес</p>
        <div className="add-ons__cards">
          <div className="add-ons__card add-ons__card_first">
            <img
              className="add-ons__image add-ons__image_first"
              src={CLogo}
              alt=""
            />
          </div>
          <div className="add-ons__card add-ons__card_second">
            <img
              className="add-ons__image add-ons__image_second"
              src={udsLogo}
              alt=""
            />
          </div>
          <div className="add-ons__card add-ons__card_third">
            <img
              className="add-ons__image add-ons__image_third"
              src={staticsLogo}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOns;
