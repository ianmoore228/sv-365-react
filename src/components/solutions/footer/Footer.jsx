import "./footer.css";
import planet from "../../../assets/images/solutions/footer/planet.png";
import footerBackground from "../../../assets/images/solutions/footer/footer-bottom-img.png";
import logo from "../../../assets/images/sv.svg";

const Footer = () => {
  return (
    <footer className="footer-solution">
      <div className="footer-solution__wrapper">
        <div className="footer-solution__container footer-solution__container_top">
          <img
            className="footer-solution__bacgkround-image footer-solution__bacgkround-image_top"
            src={planet}
            alt=""
          />
          <div className="footer-solution__content-text footer-solution__content-text_top">
            <h1 className="footer-solution__title">
              Управление сетью заведений через единый интерфейс
            </h1>
            <p className="footer-solution__subtitle">
              Отлично подойдет для автоматизации кафе
            </p>
          </div>
        </div>
        <div className="footer-solution__container footer-solution__container_bottom">
          <div className="footer-solution__content-text footer-solution__content-text_bottom">
            <img className="footer-solution__logo" src={logo} alt="" />
            <h3 className="footer-solution__text footer-solution__text_phone">8 812 908 09 00</h3>
            <p className="footer-solution__text footer-solution__text_email">e-mail: office@sv365.ru</p>
            <p className="footer-solution__text footer-solution__text_address">г. Калининград, ул Ленина, д 30</p>
            <p className="footer-solution__text footer-solution__text_company">Программное обеспечение «Свистунов»</p>
            <p className="footer-solution__text footer-solution__text_company">Разработка группы компаний «СВ Профи»</p>
          </div>
          <img
            className="footer-solution__bacgkround-image footer-solution__bacgkround-image_bottom"
            src={footerBackground}
            alt=""
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
