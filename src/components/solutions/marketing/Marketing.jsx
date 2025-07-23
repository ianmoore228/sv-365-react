import "./marketing.css";
import marketingData from "./marketing-data";
import { useLocation } from "react-router-dom";
import imgLaptop from "../../../assets/images/solutions/marketing/notebook.png";
import arrowLeft from "../../../assets/images/solutions/marketing/block29-arrow-left.png";
import arrowRight from "../../../assets/images/solutions/marketing/block29-arrow-right.png";
import imgScreen from "../../../assets/images/solutions/marketing/block29-screen-2.png";
import imgMail from "../../../assets/images/solutions/marketing/block29-mail-1.png";
import imgScreenEmpty from "../../../assets/images/solutions/marketing/screen.png";
import backgroundFirst from "../../../assets/images/solutions/marketing/block29_bg-one.png";
import backgroundSecond from "../../../assets/images/solutions/marketing/block29-bg-two.png";
import backgroundThird from "../../../assets/images/solutions/marketing/block29-bg-three.png";

const Marketing = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const marketingDataObj = marketingData.find(
    (item) => item.path === currentPath
  );

  const marketingImageFirst = marketingDataObj
    ? marketingDataObj.imageFirst
    : "";

  const marketingImageSecond = marketingDataObj
    ? marketingDataObj.imageSecond
    : "";

  const marketingImageThird = marketingDataObj
    ? marketingDataObj.imageThird
    : "";

  return (
    <div id="marketing" className="marketing">
      <div className="marketing__wrapper">
        <div className="marketing__container marketing__container_first">
          <div className="marketing__content-image marketing__content-image_first">
            <img
              className="marketing__image marketing__image_first"
              src={imgLaptop}
            />
          </div>
          <div className="marketing__content-right marketing__content-right_first">
            <h1 className="marketing__title marketing__title_first">Маркетинг</h1>
          </div>
        </div>
        <div className="marketing__container marketing__container_second">
          <div className="marketing__content-text marketing__content-text_second">
            <h2 className="marketing__subtitle">Публикации в соцсетях</h2>
            <p className="marketing__text">
              Планируйте свои публикации в социальных сетях на весь месяц.
            </p>
            <img
              className="marketing__image-arrow marketing__image-arrow_right arrow"
              src={arrowRight}
            />
          </div>
          <div className="marketing__content-image marketing__content-image_second">
            <img
              className="marketing__image marketing__image_second"
              src={marketingImageFirst}
            />
          </div>
          <img
            className="marketing__background-image marketing__background-image_first"
            src={backgroundFirst}
          />
        </div>
        <div className="marketing__container marketing__container_third">
          <div className="marketing__content-image marketing__content-image_third">
            <img
              className="marketing__image marketing__image_third"
              src={imgScreen}
            />
          </div>
          <div className="marketing__content-text marketing__content-text_third">
            <h2 className="marketing__subtitle">Акции и промокоды</h2>
            <p className="marketing__text">
              Создавайте уникальные акции и промокоды, и публикуйте их
              автоматически на всех платформах.
            </p>
            <img
              className="marketing__image-arrow marketing__image-arrow_left arrow"
              src={arrowLeft}
            />
          </div>
        </div>
        <div className="marketing__container marketing__container_fourth">
          <div className="marketing__content-text marketing__content-text_fourth">
            <h2 className="marketing__subtitle">
              Создавайте уникальные акции и промокоды, и публикуйте их
              автоматически на всех платформах.
            </h2>
          </div>
          <div className="marketing__content-image marketing__content-image_fourth">
            <img
              className="marketing__image marketing__image_fourth"
              src={marketingImageSecond}
            />
          </div>
          <img
            className="marketing__background-image marketing__background-image_second"
            src={backgroundSecond}
          />
        </div>
        <div className="marketing__container marketing__container_fifth">
          <div className="marketing__content-image marketing__content-image_fifth">
            <img
              className="marketing__image marketing__image_fifth"
              src={imgMail}
            />
          </div>
          <div className="marketing__content-text marketing__content-text_fifth">
            <h2 className="marketing__subtitle">
              Создай удобную бонусную программу
            </h2>
            <p className="marketing__text">
              Запускайте таргетированные рассылки по email и отправляйте
              push-уведомления для привлечения клиентов.
            </p>
          </div>
        </div>
        <div className="marketing__container marketing__container_sixth">
          <div className="marketing__content-text marketing__content-text_sixth">
            <h2 className="marketing__subtitle">
              Отслеживай и корректируй работу маркетинговых мероприятий
            </h2>
            <p className="marketing__text">
              Постоянно анализируйте эффективность своих маркетинговых акций.
              Получайте отчеты и статистику, чтобы вносить необходимые изменения
              и оптимизировать стратегии для достижения максимальных
              результатов.
            </p>
          </div>
          <div className="marketing__content-image marketing__content-image_sixth">
            <img
              className="marketing__image marketing__image_sixth"
              src={imgScreenEmpty}
            />
          </div>
        </div>
        <div className="marketing__container marketing__container_seventh">
          <div className="marketing__wrapper-container">
            <div className="marketing__content-text marketing__content-text_seventh">
              <h2 className="marketing__subtitle marketing__subtitle_seventh">
                Создавай мультибренды
              </h2>
              <p className="marketing__text">
                Удерживайте покупателей, которые любят пробовать новое и часто
                переключаются между брендами. Создайте разнообразное
                предложение, чтобы удовлетворить их интересы и повысить
                лояльность.
              </p>
            </div>
            <div className="marketing__content-image marketing__content-image_empty"></div>
          </div>
          <img
            src={marketingImageThird}
            className="marketing__image marketing__image_seventh"
          />
          <div className="marketing__wrapper-container">
          <div className="marketing__content-image marketing__content-image_empty"></div>
            <div className="marketing__content-text marketing__content-text_seventh">
              <h2 className="marketing__subtitle marketing__subtitle_seventh">
                Создает брендовое разнообразие
              </h2>
              <p className="marketing__text marketing__text_bottom">
                Создавайте брендовое разнообразие, чтобы привлекать различные
                целевые группы. Расширяя аудиторию, вы увеличиваете клиентскую
                базу и долю вашей компании на рынке.
              </p>
            </div>
          </div>
          <img className="marketing__background-image marketing__background-image_third" src={backgroundThird}/>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
