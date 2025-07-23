import "./footer.css";
import logo from "../../../assets/images/SV.svg";

const Footer = () => {
  return (
    <footer className="profile-footer">
      <div className="profile-footer__wrapper">
        <div className="profile-footer__container">
          <div className="profile-footer__left">
            <img className="profile-footer__logo" src={logo} />
          </div>
          <div className="profile-footer__right">
            <a href="tel:+78129080900" className="profile-footer__item">8 812 908-09-00</a>
            <a href="mailto:info@sv365.ru" className="profile-footer__item">e-mail: info@sv365.ru</a>
            <p className="profile-footer__item">г. Калининград, Ленинcкий пр-т., д.30</p>
          </div>
        </div>
        <p className="profile-footer__text profile-footer__text_top">ООО СВ ПРОФИ ИНН: 3900018221 КПП: 390001001 ОГРН: 1233900013027</p>
        <p className="profile-footer__text profile-footer__text_bottom">Программное обеспечение «Свистунов» - разработка группы компаний «СВ Профи»</p>
      </div>
    </footer>
  );
};

export default Footer;